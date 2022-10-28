import { useEffect, useState } from 'react';

const ws = new WebSocket('ws://localhost:5001/')

function Scoreboard() {
    const [teams, setTeams] = useState([]);

    ws.onopen = () => {
        console.log('WebSocket Client Connected');
    };
    
    ws.onmessage = (message) => {
        sortTeams(JSON.parse(message.data));
    };

    const sortTeams = (teams) => {
        let sortedTeams = teams.sort((a, b) => {
            return b.score - a.score;
        });
        setTeams(sortedTeams);
    }

    return (
        <div>
            <h1 style={{ textAlign: "center" }}>Scoreboard</h1>
            <div className="container text-center">
                {teams.map((team) => {
                 return (
                    <div className="row" style={{color: team.color}} key={team.id}>
                        <div className="col">
                            {team.name}
                        </div>
                        <div className="col">
                            {team.score}
                        </div>
                    </div>
                 )   
                })}
            </div>
        </div>
    );
}

export default Scoreboard;
