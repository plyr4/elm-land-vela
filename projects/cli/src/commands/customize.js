import { Files } from "../files.js"
import { Utils, Terminal } from "./_utils.js"

let printHelpInfo = () => {
  return {
    message: [
      '',
      Utils.intro.success(`detected the ${Terminal.green('help')} command`),
      `    The ${Terminal.cyan('elm-land customize')} command, you'll need to provide`,
      `    the file you'd like to customize.`,
      '',
      '    Here are the customizable files:',
      '',
      ...(
        Object.entries(Utils.customizableFiles)
          .map(([command, { description }]) =>
            `    elm-land customize ${Terminal.pink(command)} ${description}`
          )
      ),
      ''
    ].join('\n'),
    files: [],
    effects: []
  }
}

let run = async ({ moduleName } = {}) => {

  try {
    await Files.readFromUserFolder('elm-land.json')
  } catch (_) {
    return Promise.reject(Utils.notInElmLandProject)
  }

  let aliases = {
    'interop': 'js',
    'javascript': 'js',
    'typescript': 'ts',
    '404': 'not-found'
  }

  let obj = Utils.customizableFiles[aliases[moduleName] || moduleName]


  if (!obj) {
    return Promise.reject(Utils.didNotRecognizeCommand({
      baseCommand: 'elm-land customize',
      subCommand: moduleName,
      subcommandList: [
        '   Here are the commands:',
        '',
        ...(
          Object.entries(Utils.customizableFiles)
            .map(([command, { description }]) =>
              `   elm-land customize ${Terminal.pink(command)} ${description}`
            )
        )
      ]
    }))
  }

  let count = obj.filepaths.length
  let countWithUnits = count === 1 ? `${count} new file` : `${count} new files`

  let pathsToNewFiles = obj.filepaths.map(({ target }) => Terminal.cyan(`    ./src/${target}`))

  let helpMessage = count === 1
    ? `    If this was a mistake, you can delete that file\n    to safely restore the original version.`
    : `    If this was a mistake, delete any of those files\n    to safely restore the original versions.`

  return {
    message: [
      '',
      Utils.intro.success(`moved ${Terminal.pink(countWithUnits)} into your ${Terminal.cyan('src')} folder`),
      ...pathsToNewFiles,
      '',
      helpMessage,
      '',
    ].join('\n'),
    files: [],
    effects: [
      { kind: 'customize', filepaths: obj.filepaths },
    ]
  }
}

export const Customize = {
  run, printHelpInfo
}
