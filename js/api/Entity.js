/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * Имеет свойство HOST, равно 'https://bhj-diplom.letsdocode.ru'.
 * */
class Entity {

  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list( data, callback = f => f ) {
    let options = {
      method: 'GET',
      url: this.HOST + this.URL,
      data: data,
      responseType: 'json',
      callback
    }
    return createRequest(options);
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create( data, callback = f => f ) {
    let newData = Object.assign({_method: 'PUT'}, data),
        options = {
          method: 'POST',
          url: this.HOST + this.URL,
          data: newData,
          responseType: 'json',
          callback

        }
    console.log(options)
    return createRequest(options);
  }

  /**
   * Получает информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static get( id = '', data, callback = f => f ) {
      let options = {
        method: 'GET',
        url: this.HOST + this.URL,
        data: data,
        id: data.id,
        responseType: 'json',
        callback
      }
    return createRequest(options);

  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove( id = '', data, callback = f => f ) {
    let newData = Object.assign({_method: 'DELETE'}, data),
        options = {
          method: 'POST',
          url: this.HOST + this.URL,
          data: newData,
          id: data.id,
          responseType: 'json',
          callback

        }
     console.log(data)   
    return createRequest(options);
  }
}

Entity.HOST = 'https://bhj-diplom.letsdocode.ru';
Entity.URL = '';

