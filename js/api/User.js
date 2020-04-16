/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство HOST, равно значению Entity.HOST.
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    //user = JSON.stringify(user)
    
      localStorage.user = JSON.stringify(user)
    

  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    delete localStorage.user;

  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    if (localStorage.user) {
      return JSON.parse(localStorage.user);
    } else {
      return undefined;
    }
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch( data, callback = f => f ) {
    let options = {
      data: data,
      method: 'GET',
      url: this.HOST + this.URL + '/current',
      responseType: 'json',
      callback: (err, response) => {
        if (response.success) {
          this.setCurrent(response.user);
        } else {
          this.unsetCurrent();
        }
        callback(err, response);
      }
    }
    return createRequest(options)
    

  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login( data, callback = f => f ) {
    let options = {
      data: data,
      method: 'POST',
      url: this.HOST + this.URL + '/login',
      responseType: 'json',
      callback: (err, response) => {
        if (response.success) {
          this.setCurrent(response.user);
          console.log(response.user)
        } 
        callback(err, response);
      }
    }
    return createRequest(options)
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register( data, callback = f => f ) {
    let options = {
      data: data,
      method: 'POST',
      url: this.HOST + this.URL + '/register',
      responseType: 'json',
      callback: (err, response) => {
        if (response.success) {
          this.setCurrent(response.user);
        } 
        callback(err, response);
      }
    }
    return createRequest(options)

  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout( data, callback = f => f ) {
    let options = {
      method: 'POST',
      url: this.HOST + this.URL + '/logout',
      responseType: 'json',
      callback: (err, response) => {
        if (response.success) {
          this.unsetCurrent(response.user);
        } 
        callback(err, response);
      }
    }
    return createRequest(options);
  }
}

User.URL = '/user';
User.HOST = Entity.HOST


