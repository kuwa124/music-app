// axiosライブラリをインポートする
import axios from "axios";

// SpotifyClientクラスを定義する
class SpotifyClient {
  // クラスメソッドで初期化処理を行う
  static async initialize() {
    // Spotifyの認証APIにPOSTリクエストを送信する
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      {
        grant_type: "client_credentials", // 認証方式を指定
        client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID, // クライアントIDを指定
        client_secret: process.env.REACT_APP_SPOTIFY_CLIENT_SECRET, // クライアントシークレットを指定
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", // リクエストヘッダを設定
        },
      }
    );

    // SpotifyClientインスタンスを作成する
    let spotify = new SpotifyClient();
    // レスポンスからアクセストークンを取得し、インスタンスのtokenプロパティに設定する
    spotify.token = response.data.access_token;
    // インスタンスを返す
    return spotify;
  }

  // テスト用のメソッド
  async getPopularSongs() {
    const response = await axios.get(
      "https://api.spotify.com/v1/playlists/37i9dQZF1DX9vYRBO9gjDe/tracks",
      {
        headers: {Authorization: "Bearer " + this.token},  
      }
    );
    return response.data;
  }

  async searchSongs(keyword) {
    const response = await axios.get(
      "https://api.spotify.com/v1/search",
      {
        headers: { Authorization: "Bearer " + this.token },  
        params:{q:keyword, type:"track" },
      }
    );
    return response.data.traks;
  }
}

// SpotifyClientを初期化し、spotifyという変数に代入する
const spotify = await SpotifyClient.initialize();
// spotifyを外部からインポート可能にする
export default spotify;