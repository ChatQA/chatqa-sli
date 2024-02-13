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
    const { stdout, stderr } = await exec(
      'slidev export slides.md --output my-pdf-export'
    );
    console.log(stdout);
    console.log(stderr);
    return fs.createReadStream('./my-pdf-export.pdf');
  }
}
