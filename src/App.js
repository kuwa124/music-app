// ReactからuseStateをインポート
import { useState } from 'react';

// SongListコンポーネントをインポート（ファイル名を修正）
import { SongList } from './components/SongList';

// Playerコンポーネントをインポート
import { Player } from './components/player';

// SearchInputコンポーネントをインポート
import { SearchInput } from './components/SearchInput';

// Paginationコンポーネントをインポート
import { Pagination } from './components/Pagination';

// useAudioカスタムフックをインポート
import { useAudio } from './hooks/useAudio';

// usePopularSongsカスタムフックをインポート
import { usePopularSongs } from './hooks/usePopularSongs';

// useSearchカスタムフックをインポート
import { useSearch } from './hooks/useSearch';

// Appコンポーネントの定義
export default function App() {
  // 選択された曲の状態とその状態を更新するための関数をuseStateフックから取得
  const [selectedSong, setSelectedSong] = useState();
  // useAudioフックから必要な状態と関数を取得
  const { isPlay, audioRef, playSong, pauseSong } = useAudio();

  // usePopularSongsフックから必要な状態と関数を取得
  const { isLoading: isLoadingPopular, popularSongs } = usePopularSongs();

  // useSearchフックから必要な状態と関数を取得
  const {
    isLoading: isLoadingSearch,
    searchedSongs,
    setKeyword,
    searchSongs,
    hasNext,
    hasPrev,
    page,
    setPage,
  } = useSearch();

  // 全体のローディング状態を計算
  const isLoading = isLoadingPopular || isLoadingSearch;

  // 検索結果が存在するかどうかを示すフラグ
  const isSearchedResult = searchedSongs != null;

  // 選択された曲を処理する非同期関数
  const handleSongSelected = async (song) => {
    // 選択された曲をステートに設定する
    setSelectedSong(song);

    if (song.preview_url != null) {
      // 選択された曲のプレビューURLをオーディオの参照に設定する
      audioRef.current.src = song.preview_url;
      // 曲を再生する
      playSong();
    } else {
      // 曲を一時停止する
      pauseSong();
    }
  };

  // 曲の再生/一時停止を切り替える関数
  const toggleSong = () => {
    if (isPlay) {
      // 曲が再生中の場合は一時停止する
      pauseSong();
    } else {
      // 曲が一時停止中の場合は再生する
      playSong();
    }
  };

  // 検索入力の変更を処理する関数
  const handleInputChange = (e) => {
    // 検索キーワードをステートに設定する
    setKeyword(e.target.value);
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
          <h1 className='text-4xl font-bold'>Music App</h1>
        </header>
        {/* 検索入力コンポーネントを表示 */}
        <SearchInput
          onInputChange={handleInputChange}
          onSubmit={searchSongs}
        ></SearchInput>
        <section>
          {/* 検索結果が存在する場合は検索結果、そうでない場合は人気のある曲を表示 */}
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
