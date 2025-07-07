import AppServer from '../app';

let appServer: AppServer;

export const getTestApp = () => {
  if (!appServer) {
    appServer = new AppServer();
    appServer.getApp(); 
  }
  return appServer.getApp();
};