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
  test() {
    // tokenプロパティの値をコンソールに出力する
    console.log(this.token);
  }
}

// SpotifyClientを初期化し、spotifyという変数に代入する
const spotify = await SpotifyClient.initialize();
// spotifyを外部からインポート可能にする
export default spotify;