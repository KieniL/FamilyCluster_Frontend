
def containerBuild = "luke19/familyfrontend:${BUILD_NUMBER}"

pipeline {
  agent any

  environment {
    SONAR_TOKEN = credentials('sonarqube')
  }

  stages {

    stage('Checkout') {
      steps {
          checkout scm
      }
    }

    stage ('Install Stage') {
      steps {
        script {
          try {
            sh "npm install"
          } catch (exc) {
            error('Installation failed' + exc.message)
          }
        }
      }
      
    }

    stage ('Test stage') {

      parallel {

        stage ('Updating Stage') {
          steps {
            script {
              try {
                sh "rm update.txt || true"
                sh "ng update > update.txt"

                publishHTML (target: [
                    allowMissing: false,
                    alwaysLinkToLastBuild: false,
                    keepAll: true,
                    reportDir: './',
                    reportFiles: 'update.txt',
                    reportName: "Update Report"
                  ])
              } catch (exc) {
                error('Updating failed' + exc.message)
              }
            }
          }
        }

        stage ('Imaging stage'){
          steps {
            script{
              try{
                withDockerRegistry(credentialsId: 'docker', url: 'https://index.docker.io/v1/') {
                    app = docker.build(containerBuild)
                    app.push()
                }
              }catch (exc) {
                error('packaging failed' + exc.message)
              }
            }
          }
        }

        stage ('Check Secrets Stage') {
          steps {
            script{
              try {
                sh "rm trufflehog.txt || true"
                sh 'docker run --rm --name trufflehog dxa4481/trufflehog --regex https://github.com/KieniL/FamilyCluster_Frontend.git > trufflehog.txt'
          
                publishHTML (target: [
                  allowMissing: false,
                  alwaysLinkToLastBuild: false,
                  keepAll: true,
                  reportDir: './',
                  reportFiles: 'trufflehog.txt',
                  reportName: "Trufflehog Report"
                ])
              }catch (exc) {
                error('Check secret failed' + exc.message)
              }   
            }
          }

        }

        stage ('Source Composition Analysis Stage') {
          steps {
            script{
              try{
                sh 'rm owasp* || true'
                sh 'wget "https://raw.githubusercontent.com/KieniL/FamilyCluster_Config/master/owasp-dependency-check.sh" '
                sh 'chmod +x owasp-dependency-check.sh'
                sh './owasp-dependency-check.sh'
                
                publishHTML (target: [
                    allowMissing: false,
                    alwaysLinkToLastBuild: false,
                    keepAll: true,
                    reportDir: 'odc-reports',
                    reportFiles: 'dependency-check-report.html',
                    reportName: "OWASP Dependency Report"
                ])
              }catch (exc) {
                error('Source composition analysis failed' + exc.message)
              }
            }
          }
        }

        stage ('SAST') {
          steps {
            script {
              sh 'sonar.txt || true'
              sh "${sonar}/bin/sonar-scanner  > sonar.txt"

              publishHTML (target: [
                  allowMissing: false,
                  alwaysLinkToLastBuild: false,
                  keepAll: true,
                  reportDir: './',
                  reportFiles: 'sonar.txt',
                  reportName: "Sonarscan Report"
                ])

                sh "rm -R .scannerwork/"
            }
          }
        }

        stage ('Auditing Stage') {
          steps {
            script {
              try {
                sh "rm audit.txt || true"
                sh "npm audit > audit.txt"

                publishHTML (target: [
                  allowMissing: false,
                  alwaysLinkToLastBuild: false,
                  keepAll: true,
                  reportDir: './',
                  reportFiles: 'audit.txt',
                  reportName: "NPM Audit Report"
                ])
              } catch (exc) {
                error('Auditing failed' + exc.message)
              }
            }
          }
        }
      }
    }

    stage ('Deploying and Anchoring Stage') {

      parallel {
        stage ('Deploying Stage') {
          steps {
            sh "sed -i \"s/<VERSION>/${BUILD_NUMBER}/g\" deployment.yaml"
            sh "kubectl apply -f deployment.yaml"
            sh "kubectl apply -f service.yaml"
            sh "kubectl apply -f hpa.yaml"
          }
        }

        stage ('Anchoring Stage'){
          steps {
            writeFile file: 'anchore_images', text: containerBuild
                anchore name: 'anchore_images'
          }
        }

      }
      

    }

  }
}