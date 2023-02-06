import AppController from './infra/controller/AppController';
import { TaskController } from './infra/controller/TaskController';
import ExpressAdapter from './infra/http/ExpressAdapter';
import { TaskDatabaseRepository } from './infra/repository/TaskDatabaseRepository';
import Env from './infra/util/Env';

const http = new ExpressAdapter();
const taskRepository = new TaskDatabaseRepository();

new AppController(http);
new TaskController(http, taskRepository);

http.listen(Env.variable.PORT);
