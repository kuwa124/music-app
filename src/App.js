// ReactからuseEffectとuseStateをインポート
import { useState } from 'react';

// SongListコンポーネントをインポート
import { SongList } from './components/Songlist';

// Spotify APIを利用するためのspotifyモジュールをインポート
import spotify from './services/spotifyService';

// Playerコンポーネントをインポート
import { Player } from './components/player';

// SearchInputコンポーネントをインポート
import { SearchInput } from './components/SearchInput';

// Paginationコンポーネントをインポート
import { Pagination } from './components/Pagination';

// 定数をインポート
import { SONGS_PER_PAGE, APP_NAME } from './utils/constants';

// usePopularSongsカスタムフックをインポート
import { usePopularSongs } from './hooks/usePopularSongs';

// useSongPlayerカスタムフックをインポート
import { useSongPlayer } from './hooks/useSongPlayer';

// Appコンポーネントの定義
export default function App() {
  // ローディング状態とその状態を設定するためのuseStateフック
  const [isLoading, setIsLoading] = useState(false);

  // usePopularSongsカスタムフックから人気の曲の状態とフラグを取得
  const {
    isLoading: popularSongsLoading, // 人気の曲の取得中のフラグ
    popularSongs, // 人気の曲のデータ
    setPopularSongs, // 人気の曲のデータを更新する関数
  } = usePopularSongs();

  // useSongPlayerカスタムフックから再生状態、オーディオ要素への参照、曲の選択、再生、一時停止、切り替えの関数を取得
  const {
    isPlay,
    audioRef,
    handleSongSelected,
    playSong,
    pauseSong,
    toggleSong,
  } = useSongPlayer();

  // 選択された曲の状態とその状態を更新するための関数をuseStateフックから取得
  const [selectedSong, setSelectedSong] = useState();

  // 検索キーワードの状態とその状態を更新するための関数をuseStateフックから取得
  const [keyword, setKeyword] = useState('');

  // 検索結果の曲の状態とその状態を更新するための関数をuseStateフックから取得
  const [searchedSongs, setSearchedSongs] = useState();

  // 現在のページ番号の状態とその状態を更新するための関数をuseStateフックから取得
  const [page, setPage] = useState(1);

  // 次のページが存在するかどうかのフラグとそのフラグを更新する関数
  const [hasNext, setHasNext] = useState(false);

  // 前のページが存在するかどうかのフラグとそのフラグを更新する関数
  const [hasPrev, setHasPrev] = useState(false);

  // 検索結果が存在するかどうかを示すフラグ
  const isSearchedResult = searchedSongs != null;

  // 検索入力の変更を処理する関数
  const handleInputChange = (e) => {
    // 検索キーワードをステートに設定する
    setKeyword(e.target.value);
  };

  // 曲を検索する非同期関数
  const searchSongs = async (page) => {
    // ローディング状態をtrueに設定
    setIsLoading(true);
    // ページ番号からオフセットを計算
    const offset = parseInt(page) ? (parseInt(page) - 1) * SONGS_PER_PAGE : 0;
    // Spotify APIを使用して曲を検索する
    const result = await spotify.searchSongs(keyword, SONGS_PER_PAGE, offset);
    setHasNext(result.next != null);
    setHasPrev(result.previous != null);
    console.log(result);
    // 検索結果の曲をステートに設定する
    setSearchedSongs(result.items);
    // ローディング状態をfalseに設定
    setIsLoading(false);
  };

  // 次のページに移動する非同期関数
  const moveToNext = async () => {
    // 次のページ番号を計算
    const nextPage = page + 1;
    // 次のページの検索結果を取得
    await searchSongs(nextPage);
    // ページ番号をステートに設定
    setPage(nextPage);
  };

  // 前のページに移動する非同期関数
  const moveToPrev = async () => {
    // 前のページ番号を計算
    const prevPage = page - 1;
    // 前のページの検索結果を取得
    await searchSongs(prevPage);
    // ページ番号をステートに設定
    setPage(prevPage);
  };

  // アプリケーションのレイアウトを定義
  return (
    <div className='flex flex-col min-h-screen bg-gray-900 text-white'>
      <main className='flex-1 p-8 mb-20'>
        <header className='flex justify-between items-center mb-10'>
          {/* アプリケーション名を表示 */}
          <h1 className='text-4xl font-bold'>{APP_NAME}</h1>
        </header>
        {/* 検索入力コンポーネントを表示 */}
        <SearchInput
          onInputChange={handleInputChange}
          onSubmit={searchSongs}
        ></SearchInput>
        <section>
          {/* 検索結果が存在する場合は検索結果、そうでない場合は人気のある曲を表示するセクションタイトルを表示 */}
          <h2 className='text-2xl font-semibold mb-5'>
            {isSearchedResult ? 'Searched Results' : 'Popular Songs'}
          </h2>
          {/* SongListコンポーネントを表示し、ローディング状態と曲のリストを渡す */}
          <SongList
            isLoading={isLoading}
            songs={isSearchedResult ? searchedSongs : popularSongs}
            onSongSelected={handleSongSelected}
          ></SongList>
          {/* 検索結果が存在する場合はPaginationコンポーネントを表示 */}
          {isSearchedResult && (
            <Pagination
              onPrev={hasPrev ? moveToPrev : null}
              onNext={hasNext ? moveToNext : null}
            ></Pagination>
          )}
        </section>
      </main>
      {/* 選択された曲が存在する場合はPlayerコンポーネントを表示 */}
      {selectedSong != null && (
        <Player
          song={selectedSong}
          isPlay={isPlay}
          onButtonClick={toggleSong}
        />
      )}
      {/* オーディオ要素を定義 */}
      <audio ref={audioRef} />
    </div>
  );
}