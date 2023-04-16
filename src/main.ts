import AppController from './infra/controller/AppController.js';
import { TaskController } from './infra/controller/TaskController.js';
import ExpressAdapter from './infra/http/ExpressAdapter.js';
import { TaskDatabaseRepository } from './infra/repository/TaskDatabaseRepository.js';
import Env from './infra/util/Env.js';

const http = new ExpressAdapter();
const taskRepository = new TaskDatabaseRepository();

new AppController(http);
new TaskController(http, taskRepository);

http.listen(Env.variable.PORT);
