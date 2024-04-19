---
outline: [2,3]
---

# CLI commands

## Overview

The [Elm Land CLI](https://www.npmjs.com/package/elm-land) tool is available via NPM. This one command-line tool has everything you need
to create new projects, run your development server, and even build your application for production.

After installing, you can run `elm-land --help` to see these commands at any time. This page is a more
detailed breakdown of the documentation you'll see in your terminal.

## elm-land init

```txt
elm-land init <folder-name> ...... create a new project
```

#### Description

This command creates a new Elm Land project with only three files:

1. `elm.json` - defines Elm package dependencies
1. `elm-land.json` - defines the default [Elm Land configuration](../reference/elm-land-json)
1. `src/Pages/Home_.elm` – the homepage for your new app

__Note:__ This command will also create a `.gitignore` file, and an `.elm-land` folder which should _not_
be committed to version control.

#### Arguments

`<folder-name>` – Required name of the folder for the new Elm Land project.


## elm-land server

```txt
elm-land server ................ run a local dev server
```

#### Description

This command starts a development server (powered by [Vite](https://vitejs.dev)) at `http://localhost:1234`. If 
port `1234` is already taken, the server will automatically find the next available port.


#### Server configuration

Although Elm Land is using Vite under the hood, we don't allow users to customize it with their own `vite.config.js` file. This may sound like a weird choice, but it
means that __Elm Land can automatically upgrade your project__ to the latest blazing-fast JS developer tooling.

All configuration can be specified in [the `elm-land.json` file](../reference/elm-land-json), so you can still add `<link>` tags, work with environment variables, and more!

::: tip The JavaScript ecosystem moves fast!

When Elm Land got started, it was using __Vite 2__. Already, the choice to use `elm-land.json` has enabled us to seamlessly upgrade all Elm Land users to __Vite 4__.

Next, we're looking to add `elm-watch` to our existing Vite setup. That will combine the best-in-class Elm hot reloading experience with the _incredible_ developer experience of Vite!

:::


## elm-land build

```txt
elm-land build .......... build your app for production
```

#### Description

This command builds your Elm Land app in production-mode. This includes running the Elm compiler with `--optimize` flag, and even JS minification with [terser](https://terser.org/). The result is a static site that is ready to be hosted from the `./dist` folder.

Visit the [Deploying to production](../guide/deploying) guide to learn how to correctly set up SPA redirects to the single `dist/index.html` file.




## elm-land generate

```txt
elm-land generate ............. generate Elm Land files
```

#### Description

The first step of the `elm-land build` command generates some `.elm` files in the `.elm-land/src` folder. Some projects don't need a full build step (generating a JS file, HTML file, etc),
and want to manually run `elm make` on the generated code.

For those advanced use cases, we've added a specific `generate` command that doesn't involve the unnecessary build steps.

## elm-land add page

```txt
elm-land add page <url> ................ add a new page
```

#### Description

This scaffolding command generates a new Elm Land page in your `src/Pages` folder. 


#### Arguments

`<url>` – the URL you want this page to be available on.

Here are some examples:

```
elm-land add page / .............. Creates "src/Pages/Home_.elm"
elm-land add page /sign-in ....... Creates "src/Pages/SignIn.elm"
elm-land add page /users/:id ..... Creates "src/Pages/Users/Id_.elm"
elm-land add page '/users/*' ..... Creates "src/Pages/Users/ALL_.elm"
```

::: tip "Wait, what about the other page types?"

In the start of the guide, you may have seen commands like `page:view`, `page:sandbox`, and `page:element`. It's possible to add those pages to your app, but they are __intended for learning the basics__ of the Elm Land framework. 

__Because there is no command for upgrading an existing page__, we recommend using the complete `elm-land add page` once you're comfortable with The Elm Architecture!

:::

## elm-land add layout

```txt
elm-land add layout <name> ........... add a new layout
```

#### Description

This scaffolding command generates a new Elm Land layout in your `src/Layouts` folder. Layouts are automatically
nested based on their filepath, so `Layouts.Sidebar.Header` will be contained within a `Layouts.Sidebar`.

Check out the [Layouts guide](./layouts) for more details on how they work.

#### Arguments

`<name>` – the name of the new Elm layout module

Here are some examples:

```txt
elm-land add layout Default .......... Creates "src/Layouts/Default.elm"
elm-land add layout Sidebar .......... Creates "src/Layouts/Sidebar.elm"
elm-land add layout Sidebar.Header ... Creates "src/Layouts/Sidebar/Header.elm"
```

## elm-land customize

```txt
elm-land customize <name> .. customize a default module
```

#### Description

Elm Land generates default implementations for many modules you might want to customize. When you 
are ready to customize a module, this command will move it from the `.elm-land/src` folder into 
your project's `src` folder.

From there, you can customize the module like any other file in your `src` folder.

#### Arguments

`<name>` – the name of the module to customize, can be one of the items listed below.

```
elm-land customize shared .................... share data across pages
elm-land customize not-found ... the 404 page shown for unknown routes
elm-land customize view ................ use Elm UI, Elm CSS, and more
elm-land customize effect ............. send custom effects from pages
elm-land customize auth ................... handle user authentication
```

## elm-land routes

```txt
elm-land routes ........... list all routes in your app
```

#### Description

Every Elm Land project consists of pages that connect to URL routes. This command 
lists all the routes in your application, and which pages they correspond to. This
is helpful when joining a new team, or trying to find out where a URL will take a user.

#### Example

Here's example output of what you'd see if you ran this command in the ["Pages and routes"](./pages.md) examples from the guide:

```txt

  🌈  Elm Land (v0.20.1) found 5 pages in your application
  ⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺
  src/Pages/Home_.elm ............... http://localhost:1234/
  src/Pages/SignIn.elm .............. http://localhost:1234/sign-in
  src/Pages/Blog/ALL_.elm ........... http://localhost:1234/blog/*
  src/Pages/Settings/Account.elm .... http://localhost:1234/settings/account
  src/Pages/Profile/Username_.elm ... http://localhost:1234/profile/:username

```
