import { Component, createEffect, createSignal, For, JSXElement, Show } from "solid-js"
import { langs, Langs } from "../types"
import { QueryResource, toSome } from "../utils/queryExamples"
import { Link, useRoutes, useLocation } from 'solid-app-router';
import { VsTerminal } from 'solid-icons/vs'
import { SiJavascript } from 'solid-icons/si'
import { SiPython } from 'solid-icons/si'
import { SiRust } from 'solid-icons/si'
import { CopyButton } from "./CopyButton";
import { VsLoading } from 'solid-icons/vs'

import Highlight from "solid-highlight"
import "highlight.js/styles/base16/atlas.css";
import { partiqlAPI } from "../utils/partiql";
// import "highlight.js/styles/base16/harmonic16-dark.css";
// import "highlight.js/styles/base16/solarized-dark.css"


export const CodeBlock: Component<{
  text: string,
}> = (props) => {
  return (
    <div class="sm:container sm:mx-auto relative text-white bg-sea-950 border-moon-500 border-1 rounded-2xl px-1 py-0 w-80">
      <div class='absolute top-0.3 left-2 p-0 text-sm text-gray-500'>
      </div>
      <div class='absolute -top-1 -right-1'>
        <CopyButton text={props.text} />
      </div>
      <Highlight autoDetect={true} class='text-sm'>
        {props.text.trim()}
      </Highlight>
    </div>
  )
}

export const RunBlock: Component<{
  resource: QueryResource,
}> = (props) => {
  const [isLoading, setIsLoaindg] = createSignal(false)
  const [result, setResult] = createSignal<string | null>(null)

  return (
    <div class='my-3'>
      <button
        class={`text-lg text-white my-2 py-1 px-3 rounded-xl ${isLoading()
          ? 'bg-gray-500'
          : 'bg-green-500 hover:bg-green-400'
          }`}
        disabled={isLoading()}
        onClick={async () => {
          setIsLoaindg(true)
          const data = await partiqlAPI(props.resource.url, props.resource.query)
          setIsLoaindg(false)
          setResult(JSON.stringify(data))
        }}
      >
        <Show when={isLoading()}>
          <VsLoading size={24} class='animate-spin' />
        </Show>
        <Show when={!isLoading()}>
          Run
        </Show>
      </button>
      <div class={`tex-gray-900 bg-sea-300 rounded-xl ${result() && 'p-2'
        }`}>
        {result}
      </div>
    </div>
  )
}

export const QueryCard: Component<{
  resource: QueryResource,
  lang: Langs,
}> = (props) => {
  const location = useLocation();
  const text = () => toSome(props.resource, props.lang)

  const iconSize = 16
  const targets = [
    {
      label: "CLI",
      href: '/cli',
      Icon: () => <VsTerminal size={iconSize} />
    },
    {
      label: "Rust",
      href: '/rust',
      Icon: () => <SiRust size={iconSize} />
    },
    {
      label: "Python",
      href: '/python',
      Icon: () => <SiPython size={iconSize} />
    },
    {
      label: "JavaScript",
      href: '/javascript',
      Icon: () => <SiJavascript size={iconSize} />
    }
  ]

  return (
    <div id={props.resource.id}>
      <div class="flex items-center gap-3">
        <For each={targets}>
          {({ href, label, Icon }) => (
            <Link
              href={`${href}#${props.resource.id}`}
              class={`no-underline hover:underline flex items-center gap-2
              ${location.pathname.startsWith(href)
                  ? 'text-white'
                  : 'text-gray-500'
                }`}
            >
              {label}
            </Link>
          )}
        </For>
      </div>
      <div class='flex flex-col justify-center'>
        <CodeBlock text={text()} />
      </div>
      <Show when={props.lang == 'CLI'}>
        <RunBlock resource={props.resource} />
      </Show>
    </div >
  )
}