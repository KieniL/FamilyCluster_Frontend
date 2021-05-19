
import './Home.css';

export default function Home() {

    return (
        <div>
            {localStorage.getItem('mfa_done') ?
                (<div className="homePage">
                    <h2 id="home">Home</h2>
                    <span>Select an app from the menu</span>
                </div>
                ) : null
            }

        </div>
    )

}