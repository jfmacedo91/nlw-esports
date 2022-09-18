import { FormEvent, useEffect, useState } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import * as Checkbox from "@radix-ui/react-checkbox"
import * as ToggleGroup from "@radix-ui/react-toggle-group"
import axios from "axios"
import { Check, GameController } from "phosphor-react"
import { Input } from "./Input"
import { Game } from "../../App"

export function CreateAdModal() {
  const [games, setGames] = useState<Game[]>([])
  const [weekDays, setWeekDays] = useState<string[]>([])
  const [useVoiceChannel, setUseVoiceChannel] = useState(false)

  useEffect(() => {
    axios("http://localhost:3333/games").then(response => {
        setGames(response.data)
      })
  }, [])

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault()
    
    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData)

    if(!data.name) {
      return
    }

    try {
      await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: useVoiceChannel
      })

      alert("Anúncio criado com sucesso!")
    } catch(error) {
      alert("Erro ao criar o anúncio!")
      console.error(error)
    }
  }

  return (
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/60 inset-0 fixed flex items-center justify-center">
          <Dialog.Content className=" fixed bg-[#2A2634] py-8 px-10 text-white rounded-lg w-[500px] shadow-lg">
            <Dialog.Title className="text-2xl font-black">Publique um anúncio</Dialog.Title>
            <form onSubmit={ handleCreateAd } className="mt-8 flex flex-col gap-4">
              <fieldset className="flex flex-col gap-2">
                <label htmlFor="game" className="font-semibold">Qual o jogo?</label>
                <select
                  id="game"
                  name="game"
                  className="w-full py-3 px-4 text-sm rounded bg-zinc-900 invalid:text-zinc-500"
                  placeholder="Selecione o jogo que deseja jogar"
                  defaultValue={""}
                >
                  <option disabled hidden value="">Selecione o jogo que deseja jogar</option>
                  { games.map(game => (
                    <option key={ game.id } value={ game.id }>{ game.title }</option>
                  )) }
                </select>
              </fieldset>
              <fieldset className="flex flex-col gap-2">
                <label htmlFor="name" className="font-semibold">Seu nome (ou nickname)</label>
                <Input id="name" name="name" type="text" placeholder="Como te chamam dentro do jogo?" />
              </fieldset>
              <div className="grid grid-cols-2 gap-6">
                <fieldset className="flex flex-col gap-2">
                  <label htmlFor="yearsPlaying" className="font-semibold">Joga há quanto tempo?</label>
                  <Input id="yearsPlayind" name="yearsPlaying" type="text" placeholder="Tudo bem ser ZERO" />
                </fieldset>
                <fieldset className="flex flex-col gap-2">
                  <label htmlFor="discord" className="font-semibold">Qual o seu Discord?</label>
                  <Input id="discord" name="discord" type="text" placeholder="Usuario#0000" />
                </fieldset>
              </div>
              <div className="flex gap-6">
                <fieldset className="flex flex-col gap-2">
                  <label htmlFor="weekDays" className="font-semibold">Quando costuma Jogar?</label>
                  <ToggleGroup.Root
                    type="multiple"
                    className="grid grid-cols-4 gap-2"
                    value={ weekDays }
                    onValueChange={ setWeekDays }
                  >
                    <ToggleGroup.Item
                      value="0"
                      title="Domingo"
                      className={`rounded py-3 px-4 ${ weekDays.includes("0") ? "bg-violet-500" : "bg-zinc-900"}`}
                    >
                      D
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                      value="1"
                      title="Segunda"
                      className={`rounded py-3 px-4 ${ weekDays.includes("1") ? "bg-violet-500" : "bg-zinc-900"}`}
                    >
                      S
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                      value="2"
                      title="Terça"
                      className={`rounded py-3 px-4 ${ weekDays.includes("2") ? "bg-violet-500" : "bg-zinc-900"}`}
                    >
                      T
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                      value="3"
                      title="Quarta"
                      className={`rounded py-3 px-4 ${ weekDays.includes("3") ? "bg-violet-500" : "bg-zinc-900"}`}
                    >
                      Q
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                      value="4"
                      title="Quinta"
                      className={`rounded py-3 px-4 ${ weekDays.includes("4") ? "bg-violet-500" : "bg-zinc-900"}`}
                    >
                      Q
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                      value="5"
                      title="Sexta"
                      className={`rounded py-3 px-4 ${ weekDays.includes("5") ? "bg-violet-500" : "bg-zinc-900"}`}
                    >
                      S
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                      value="6"
                      title="Sabado"
                      className={`rounded py-3 px-4 ${ weekDays.includes("6") ? "bg-violet-500" : "bg-zinc-900"}`}
                    >
                      S
                    </ToggleGroup.Item>
                  </ToggleGroup.Root>
                </fieldset>
                <fieldset className="flex flex-col gap-2 flex-1">
                  <label className="font-semibold" htmlFor="hourStart">Qual horário do dia?</label>
                  <fieldset className="grid grid-cols-2 gap-2">
                    <Input id="hourStart" name="hourStart" type="time" placeholder="De" />
                    <Input id="hourEnd" name="hourEnd" type="time" placeholder="Até" />
                  </fieldset>
                </fieldset>
              </div>
              <fieldset className="mt-2 flex items-center gap-2">
                <Checkbox.Root
                  id="voiceChannel"
                  className="w-6 h-6 p-1 rounded bg-zinc-900"
                  onCheckedChange={ checked => {
                    if(checked === true) {
                      setUseVoiceChannel(true)
                    } else {
                      setUseVoiceChannel(false)
                    }
                  } }
                >
                  <Checkbox.Indicator>
                    <Check className="w-4 h-4 text-emerald-400" />
                  </Checkbox.Indicator>
                </Checkbox.Root>
                <label className="text-sm" htmlFor="voiceChannel">Contumo de conectar ao chat de voz</label>
              </fieldset>
              <footer className="flex justify-end gap-4 mt-4">
                <Dialog.Close
                  className="px-5 h-12 font-semibold rounded-md bg-zinc-500 hover:bg-zinc-600 transition-all"
                >
                  Cancelar
                </Dialog.Close>
                <button
                  type="submit"
                  className="flex items-center gap-3 px-5 h-12 font-semibold rounded-md bg-violet-500 hover:bg-violet-600 transition-all"
                >
                  <GameController size={ 24 } />
                  Encontrar duo
                </button>
              </footer>
            </form>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
  )
}