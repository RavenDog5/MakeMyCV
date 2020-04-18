import { Module, HttpModule } from '@nestjs/common';
import { UtilsService } from './utils.service';
import { UtilsController } from './utils.controller';

@Module({
    imports: [HttpModule],
    controllers: [UtilsController],
    providers: [UtilsService]
})
export class UtilsModule {}
