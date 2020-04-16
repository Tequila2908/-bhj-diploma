/**
 * Класс AsyncForm управляет всеми формами
 * приложения, которые не должны быть отправлены с
 * перезагрузкой страницы. Вместо этого данные
 * с таких форм собираются и передаются в метод onSubmit
 * для последующей обработки
 * */
class AsyncForm {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {
    if (!element) {
      new Error('Пустой элемент');
    }
    this.element = element;
    this.registerEvents();

  }

  /**
   * Необходимо запретить отправку формы. В момент отправки
   * вызывает метод submit()
   * */
  registerEvents() {
    this.element.addEventListener("submit", e => {
      e.preventDefault();
      this.submit();
    });


  }

  /**
   * Преобразует данные формы в объект вида
   * {
   *  'название поля формы 1': 'значение поля формы 1',
   *  'название поля формы 2': 'значение поля формы 2'
   * }
   * */
  getData() {
    let form = {};

    for(let item of new FormData(this.element).entries()) {
      let key = item[0];
      let value = item[1];
      form[key] = value;
    }
    return form;
  }

  onSubmit( options ) {

  }

  /**
   * Вызывает метод onSubmit и передаёт туда
   * данные, полученные из метода getData()
   * */
  submit() {
    let options = {
      method: this.element.getAttribute('method'),
      url: this.element.getAttribute('action'),
      data: this.getData()
    }
    this.onSubmit(options);

  }
}
