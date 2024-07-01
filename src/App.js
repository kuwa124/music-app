// ReactからuseStateをインポート
import { useState } from 'react';

// useAudioカスタムフックをインポート
import { useAudio } from './hooks/useAudio';

// SongListコンポーネントをインポート
import { SongList } from './components/SongList';

// Playerコンポーネントをインポート
import { Player } from './components/player';

// SearchInputコンポーネントをインポート
import { SearchInput } from './components/SearchInput';

// Paginationコンポーネントをインポート
import { Pagination } from './components/Pagination';

// usePopularSongsカスタムフックをインポート
import { usePopularSongs } from './hooks/usePopularSongs';

// useSearchカスタムフックをインポート
import { useSearch } from './hooks/useSearch';

// useSelectedSongカスタムフックをインポート
import { useSelectedSong } from './hooks/useSelectedSong';

// Appコンポーネントの定義
export default function App() {
  // usePopularSongsフックから必要な状態と関数を取得
  const { isLoading: isLoadingPopular, popularSongs } = usePopularSongs();

  // useSelectedSongフックから必要な状態と関数を取得
  const { selectedSong, isPlay, audioRef, handleSongSelected, toggleSong } =
    useSelectedSong();

  // useSearchフックから必要な状態と関数を取得
  const {
    isLoading: isLoadingSearch,
    searchedSongs,
    setKeyword,
    searchSongs,
    hasNext,
    hasPrev,
    moveToNext,
    moveToPrev,
  } = useSearch();

  // 全体のローディング状態を計算
  const isLoading = isLoadingPopular || isLoadingSearch;

  // 検索結果が存在するかどうかを示すフラグ
  const isSearchedResult = searchedSongs != null;

  // 検索入力の変更を処理する関数
  const handleInputChange = (e) => {
    // 検索キーワードをステートに設定する
    setKeyword(e.target.value);
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
