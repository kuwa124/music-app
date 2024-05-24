// axiosライブラリをインポートする
import axios from "axios";

// Spotify APIからアクセストークンを取得する非同期関数
export const getToken = async () => {
  // URLパラメータを作成する
  const params = new URLSearchParams();
  // grant_typeパラメータを設定する
  params.append("grant_type", "client_credentials");
  // client_idパラメータを環境変数から設定する
  params.append("client_id", process.env.REACT_APP_SPOTIFY_CLIENT_ID);
  // client_secretパラメータを環境変数から設定する
  params.append("client_secret", process.env.REACT_APP_SPOTIFY_CLIENT_SECRET);

  // Spotify APIにPOSTリクエストを送信する
  const response = await axios.post(
    "https://accounts.spotify.com/api/token", // リクエストURL
    params, // リクエストボディ
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded", // Content-Typeヘッダーを設定する
      },
    }
  );
  // レスポンスデータをコンソールに出力する
  console.log(response.data);
};
