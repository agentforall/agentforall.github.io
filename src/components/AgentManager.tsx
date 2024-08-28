import { For, createEffect, createSignal } from "solid-js";
import {data, agentTypes, type AgentType} from "../data"
import { Icon } from '@iconify-icon/solid';
import Fuse from "fuse.js"
import { createAutoAnimate } from "@formkit/auto-animate/solid";


const AgentManager = () => {
    const [count, setCount] = createSignal(0);
    const [searchQuery, setSearchQuery] = createSignal("")
    const [category, setCategory] = createSignal<AgentType | "All">("All");
    const [currentResults, setResults] = createSignal<typeof data>(data);
    const fuseInstace = new Fuse(data, {
        keys: ["name"]
    })
    const [parent, setEnabled] = createAutoAnimate(/* optional config */)


    createEffect(() => {
        if(category() != "All") {
            let searchData = data.filter((data) => {
                return data.type == category()
            })
            
            if(searchQuery() == "") {
                setResults(searchData)
                return
            }else {
                fuseInstace.setCollection(searchData)
            }

            
        }
        
        if(searchQuery() != "") {

            fuseInstace.setCollection(data)
        let results = fuseInstace.search(searchQuery())
        let newList: typeof data = [];
        results.forEach((i) => {
            newList.push(i.item)
        })
        setResults(newList)
    }else {
        setResults(data)
    }
    })
    
    return (
        <main class="mb-3">
            <div class="p-3">
        <input type="search" placeholder="Search" value={searchQuery()} onChange={(e) => {setSearchQuery(e.target.value)}} />
        <select onChange={(e) => {setCategory(e.target.value as AgentType | "All")}} id="category-select"  name="category" aria-label="Select Category Of The Required Agent" required>
            <option selected value="All">
              All
            </option>
            {
                agentTypes.map((string) => {
                    return (
                            <option>
                                {string}
                            </option>
                    )
                })
            }
          </select>
            </div>

            <div ref={parent} style="display: grid;" class="grid-flow-row min-sm:grid-cols-2 place-items-center gap-3">
                <For each={currentResults()}>{(result, i) =>
                <a  style="display: flex;" class="bg-slate-700 w-[80vw]  text-center items-center gap-2 rounded-lg p-3">
                    <Icon icon="mdi:account-circle" width={30} />
                    {result.name} | {
                        Array.isArray(result.type) ?
                        result.type.join(", ")
                        : result.type
                    }
                    </a>
                }</For>
            </div>
        </main>
    )
}

export default AgentManager;