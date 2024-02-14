import { Controller, Get } from '@midwayjs/core';
import * as fs from 'fs';
import * as child_process from 'child_process';
import * as util from 'util';

const exec = util.promisify(child_process.exec);

@Controller('/')
export class HomeController {
  @Get('/')
  async home(): Promise<string> {
    return 'Hello Midwayjs!';
  }
  @Get('/build')
  async build() {
    await fs.promises.writeFile('/tmp/slides.md',
`---
theme: seriph
background: https://source.unsplash.com/collection/94734566/1920x1080
class: text-center
highlighter: shikiji
lineNumbers: false
info: |
  ## Slidev Starter Template
  Presentation slides for developers.

  Learn more at [Sli.dev](https://sli.dev)
drawings:
  persist: false
transition: slide-left
title: Welcome to Slidev
mdc: true
---

# Welcome to Slidev

Presentation slides for developers
`);
    const { stdout, stderr } = await exec(
      'slidev export /tmp/slides.md --output /tmp/my-pdf-export'
    );
    console.log(stdout);
    console.log(stderr);
    return fs.createReadStream('/tmp/my-pdf-export.pdf');
  }
}
