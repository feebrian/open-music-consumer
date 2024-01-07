const { Pool } = require('pg');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylist(playlistId) {
    const query = {
      text: `SELECT p.id, p.name, s.id as song_id, s.title as song_title, s.performer as song_performer 
              FROM playlists p 
              LEFT JOIN playlist_songs ps on ps.playlist_id = p.id
              LEFT JOIN songs s on ps.song_id = s.id 
              WHERE p.id = $1`,
      values: [playlistId],
    };

    const result = await this._pool.query(query);
    return {
      playlist: {
        id: result.rows[0].id,
        name: result.rows[0].name,
        songs: result.rows
          .map((row) => ({
            id: row.song_id,
            title: row.song_title,
            performer: row.song_performer,
          }))
          .filter((song) => song.id),
      },
    };
  }
}

module.exports = PlaylistsService;
