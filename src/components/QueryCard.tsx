import { Component, createSignal, For, Show } from "solid-js"
import { langs, Langs } from "../types"
import { QueryResource, toSome } from "../utils/queryExamples"
import { Link, useRoutes, useLocation } from 'solid-app-router';
import { VsTerminal } from 'solid-icons/vs'
import { SiJavascript } from 'solid-icons/si'
import { SiPython } from 'solid-icons/si'
import { SiRust } from 'solid-icons/si'
import { CopyButton } from "./CopyButton";

export const CodeBlock: Component<{
  text: string,
}> = (props) => {
  return (
    <div class="relative text-white bg-sea-900 border-moon-500 border-1 rounded-2xl px-6 py-4 w-108">
      <div class='absolute top-0.3 left-2 p-0 text-sm text-gray-500'>
      </div>
      <div class='absolute -top-1 -right-1'>
        <CopyButton text={props.text} />
      </div>
      <For each={props.text.split('\n')}>
        {line => (
          <div>
            {line}
          </div>
        )}
      </For>
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
      <div>
        <button class='text-lg text-white bg-green-500 py-1 px-3 rounded-xl'>
          Run
        </button>
      </div>
    </div >
  )
}