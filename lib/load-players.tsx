export async function loadPlayers() {
    // Call an external API endpoint to get posts
    const data = await fetch('http://127.0.0.1:3333/api/players');
    const players = await data.json()
   
    return players
  }