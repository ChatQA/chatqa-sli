import { Body, Controller, Get, Inject, Post } from '@midwayjs/core';
import * as fs from 'fs';
import * as child_process from 'child_process';
import * as util from 'util';
import { BuildDTO } from '../dto/build.dto';
import { v4 as uuidv4 } from 'uuid';
import { Context } from '@midwayjs/koa';

const exec = util.promisify(child_process.exec);

@Controller('/')
export class HomeController {
  @Inject()
  ctx: Context;

  @Get('/')
  async home(): Promise<string> {
    return 'Hello ChatQA Cloud!';
  }
  @Post('/build')
  async build(@Body() buildDto: BuildDTO) {
    const cacheId = uuidv4();
    await fs.promises.writeFile(`/tmp/${cacheId}.md`, buildDto.code);
    const { stdout, stderr } = await exec(
      `slidev export /tmp/${cacheId}.md --output /tmp/${cacheId}`
    );
    console.log(stdout);
    console.log(stderr);
    this.ctx.set('Content-Disposition', `attachment; filename=${cacheId}.pdf`);
    return fs.createReadStream(`/tmp/${cacheId}.pdf`);
  }
}
