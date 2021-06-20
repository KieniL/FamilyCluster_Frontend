#!/bin/bash
if [ ! -f openapi-generator-cli.jar ]; then
    curl https://repo1.maven.org/maven2/org/openapitools/openapi-generator-cli/3.3.4/openapi-generator-cli-3.3.4.jar --output openapi-generator-cli.jar
fi

cd "$(dirname "$0")"
mkdir temp && cd temp

git clone https://github.com/KieniL/FamilyCluster_Api.git
java -jar ./../openapi-generator-cli.jar generate -i  ./FamilyCluster_Api/openapi/auth-api.yml -g typescript-axios -o ./../authentication
java -jar ./../openapi-generator-cli.jar generate -i  ./FamilyCluster_Api/openapi/app-api.yml -g typescript-axios -o ./../application
java -jar ./../openapi-generator-cli.jar generate -i  ./FamilyCluster_Api/openapi/ansparen-api.yml -g typescript-axios -o ./../ansparen
java -jar ./../openapi-generator-cli.jar generate -i  ./FamilyCluster_Api/openapi/cert-api.yml -g typescript-axios -o ./../cert

cd .. && rm -rf temp