import { useState } from 'react'
import { Calendar, ArrowFatLinesDown } from 'phosphor-react'
export default function App() {
  const [repos, setRepos] = useState([])
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState([])
  
  fetch('https://api.github.com/users/lxnvrdx/repos')
    .then(res => res.json())
    .then(data => setRepos(data))
    .catch(err => console.log(err))

  const filteredRepos =
    search.length > 0 && repos.filter(repo => repo.name.includes(search))

    function filterRepoByLanguage(language) {
      const filterByTec = repos.filter(repo => repo.language === language)
        setFilter(filterByTec)
  }


  function handleOrderRepos() {
    const orderedRepos = repos.sort((a, b) => a.name.localeCompare(b.name))

    setFilter(orderedRepos)
  }

  function handleOrderReposByCommit(){
    const orderedReposbyCommit = repos.sort((a, b) => b.updated_at.localeCompare(a.updated_at))
    setFilter(orderedReposbyCommit)
  }

//como é uma aplicacao pequena, decidi não criar um componente ou regra de renderizacao, visto que a performance para execucao é muito boa.
  if(filter.length > 0){
    return(
      <div className=" flex justify-center items-center flex-col pt-20">
      <h1 className="text-3xl font-bold uppercase">My Repositories</h1>
      <p 
      className="text-base font-sans"
      >Sort by tec 💻</p>
      <div className="flex flex-row gap-2 my-4  md:flex-row sm: flex-col ">
        <button
          className="  rounded p-2 bg-orange-500 cursor-pointer hover:bg-orange-600"
          onClick={() => filterRepoByLanguage('HTML')}
        >
          HTML Repos
        </button>

        <button
          className="  rounded p-2 bg-yellow-500 cursor-pointer hover:bg-yellow-600"
          onClick={() => filterRepoByLanguage('JavaScript')}
        >
          Javascript Repos
        </button>

        <button
          className="  rounded p-2 bg-blue-600 cursor-pointer hover:bg-blue-700"
          onClick={() => filterRepoByLanguage('TypeScript')}
        >
          TypeScript Repos
        </button>
        <button
          className="  rounded p-2 border border-blue-500  cursor-pointer "
          onClick={() => setFilter([])}
        >
          Show all Repos
        </button>
      </div>
      <p 
      className="text-base font-sans mt-20"
      >Sort by name, commit or type to filter 😊</p>
      <div
       className='flex md:flex-row gap-2 justify-center items-center mt-2 sm: flex-col'
      >
        
      
      <button
      className='flex flex-row gap-2 justify-center items-center border border-blue-500 rounded p-4'
      onClick={handleOrderRepos}
      >
        <ArrowFatLinesDown size={24}/> Order by name 
      </button>
      <button
      className='flex flex-row gap-2 justify-center items-center border border-blue-500 rounded p-4'
      onClick={handleOrderReposByCommit}
      >
        <Calendar size={24} /> Order by commit 
      </button>
      </div>
        <ul className=" font-sans text-lg text-gray-400 uppercase mb-2 mt-4">
        <ul className=" font-sans text-lg uppercase ">
          {filter.map(repo => (
            <li className="mb-2" key={repo.name}>
              {' '}
              🚀{repo.name}
            </li>
          ))}
        </ul>
      </ul>
      </div>
    )
  } 


 
  return (
    <div className=" flex justify-center items-center flex-col pt-20">
      <h1 className="text-3xl font-bold uppercase">My Repositories</h1>
      <p 
      className="text-base font-sans"
      >Sort by tec 💻</p>
      <div className="flex   gap-2 my-4 md:flex-row sm: flex-col ">
        <button
          className="  rounded p-2 bg-orange-500 cursor-pointer hover:bg-orange-600"
          onClick={() => filterRepoByLanguage('HTML')}
        >
          HTML Repos
        </button>

        <button
          className="  rounded p-2 bg-yellow-500 cursor-pointer hover:bg-yellow-600"
          onClick={() => filterRepoByLanguage('JavaScript')}
        >
          Javascript Repos
        </button>

        <button
          className="  rounded p-2 bg-blue-600 cursor-pointer hover:bg-blue-700"
          onClick={() => filterRepoByLanguage('TypeScript')}
        >
          TypeScript Repos
        </button>
        <button
          className="  rounded p-2 border border-blue-500  cursor-pointer "
          onClick={() => setFilter([])}
        >
          Show all Repos
        </button>
      </div>
      <p 
      className="text-base font-sans mt-20"
      >Sort by name, commit or type to filter 😊</p>
      <div
       className='flex md:flex-row gap-2 justify-center items-center mt-2 sm: flex-col'
      >
      <input
        type="text"
        name="search"
        className="p-4 my-4 border border-blue-300  rounded focus:border-blue-500"
        placeholder="🔍 Buscar"
        onChange={e => setSearch(e.target.value)}
        value={search}
      />
      <button
      className='flex flex-row gap-2 justify-center items-center border border-blue-500 rounded p-4'
      onClick={handleOrderRepos}
      >
        <ArrowFatLinesDown size={24}/> Order by name 
      </button>
      <button
      className='flex flex-row gap-2 justify-center items-center border border-blue-500 rounded p-4'
      onClick={handleOrderReposByCommit}
      >
        <Calendar size={24} /> Order by commit 
      </button>
      </div>
    
      {search.length > 0 ? (
        <ul className=" font-sans text-lg text-gray-400 uppercase mb-2">
          {filteredRepos.map(repo => (
            <li key={repo.name}> {repo.name}</li>
          ))}
        </ul>
      ) : (
        <ul className=" font-sans text-lg uppercase ">
          {repos.map(repo => (
            <li className="mb-2" key={repo.name}>
              {' '}
              🚀{repo.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  )}

