# How To Contribute

First of all thanks for considering to contribute :)

## Setup

### Prerequisites

1. [Git](https://git-scm.com/)
2. [NodeJS (npm comes with it)](https://nodejs.org/en/)
3. [NetlifyCLI](https://github.com/netlify/cli) to test functions.

### Project Installation

1. Clone this repo with `git clone https://gitlab.com/thanos.valimitis/to-read.git`
2. Go to `toread` folder and run `npm install`

```bash
git clone https://gitlab.com/thanos.valimitis/to-read.git
cd toread
npm install
```

## Developing

**ToRead App** utilizes **NetlifyCLI** as a local development server that manages
the hosting of the web app and the serverless functions together.

- To start the development server just run `ntl dev` on the root of the project folder.
- To build the web app just run `npm run build` and in the **dist** folder you will find
  the output files.
