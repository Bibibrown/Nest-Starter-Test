import { Module } from '@nestjs/common';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { BookModule } from './book/book.module';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    // MongooseModule.forRoot(process.env.DATABASE_URL || 'mongodb://localhost:27017/nestdb'),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const options: MongooseModuleOptions = {
          uri: configService.get<string>('mongodb://localhost:27017/nestdb'),
        };

        return options;
      },
    }),
    ConfigModule.forRoot({
      cache: true,
    }),
    BookModule,
    UserModule,
  ],
  controllers: [],
  providers: [AppService, AppResolver],
})
export class AppModule {}
