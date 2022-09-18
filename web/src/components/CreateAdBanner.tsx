import { Trigger } from "@radix-ui/react-dialog"
import { MagnifyingGlassPlus } from "phosphor-react"

export function CreateAdBanner() {
  return (
    <div className="mt-8 pt-1 self-stretch bg-nlwGradient rounded-lg">
      <div className="bg-[#2A2634] px-8 py-6 rounded-md flex justify-between items-center">
        <div>
          <strong className="text-white text-2xl font-black block">
            Não encontrou seu duo?
          </strong>
          <span className="text-zinc-400 block">
            Publique um anúncio para encontrar novos players!
          </span>
        </div>
        <Trigger className="py-3 px-4 bg-violet-500 hover:bg-violet-600 text-white rounded flex items-center gap-3 transition-all">
          <MagnifyingGlassPlus size={ 24 } />
          Publicar anúncio
        </Trigger>
      </div>
    </div>
  )
}