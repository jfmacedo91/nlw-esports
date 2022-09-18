import { useEffect, useState } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import axios from "axios"
import { GameBanner } from "./components/GameBanner"
import { CreateAdBanner } from "./components/CreateAdBanner"
import { CreateAdModal } from "./components/Form/CreateAdModal"
import logo from "./assets/logo-nlw-esports.svg"
import "./styles/main.css"

export interface Game {
  id: string
  title: string
  bannerUrl: string
  _count: {
    ads: number
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    axios("http://localhost:3333/games").then(response => {
        setGames(response.data)
      })
  }, [])

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center mt-20">
      <img src={ logo } alt="NLW eSports" />
      <h1 className="text-6xl text-white font-black mt-20">
        Seu <span className="bg-nlwGradient bg-clip-text text-transparent">duo</span> está aqui.
      </h1>
      <div className="grid grid-cols-6 gap-7 mt-16">
        { games.map(game => (
          <GameBanner
            key={ game.id }
            bannerUrl={ game.bannerUrl }
            title={ game.title }
            adsCount={ game._count.ads }
          />
        )) }
      </div>
      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  )
}

export default App
