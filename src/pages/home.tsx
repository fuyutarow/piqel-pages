import { Link } from "solid-app-router"
import { For, Show } from "solid-js"
import { CodeBlock, QueryCard } from "../components/QueryCard"
import { ShowBlock } from "../components/RunBlock"
import { codeIntro, hackernewsResouce } from "../utils/introductions"
import wordmark from '../assets/wordmark.png'

export default function Home() {
  return (
    <section class="text-gray-700 p-8">
      <div class="my-3 flex justify-center">
        <img
          src={wordmark}
          height={60}
        />
      </div>
      <div class="my-3 text-gray-100 flex justify-center">
        An implementation of PartiQL written in Rust.
      </div>
      <div class="my-3 text-gray-300 flex justify-center">
        <div class='flex items-center gap-5'>
          <div class='w-80'>
            <img src={wordmark} />
          </div>
          <div class='w-80'>
            A command line tool for data processing with SQL queries.
            json, yaml, toml to your favorite format.
          </div>
        </div>
      </div>

      <div class="pt-3 pb-10 flex flex-col gap-4">
        <For each={codeIntro}>
          {({ script, result, description }) => (
            <div>
              <div class='text-gray-300'>
                {description}
              </div>
              <div class='py-2'>
                <CodeBlock text={script} />
                <Show when={result}>
                  <ShowBlock text={result} />
                </Show>
              </div>
            </div>
          )}
        </For>
      </div>
    </section>
  )
}
