/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * Наследуется от AsyncForm
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor( element ) {
    super(element);
    this.renderAccountsList();

  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    this.element.querySelector('select').innerHTML = ''
    Account.list(User.current(), (err, response) => {
      if (response.success) {
        for (let i = 0; i < response.data.length; i ++) {
            let option = `<option value="${response.data[i].id}">${response.data[i].name}</option>`;
            this.element.querySelector('select').innerHTML += option;
          
        }

      }
    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit( options ) {
    Transaction.create(options.data, (err, response) => {
      if (response.success) {
        this.element.reset();
        let type = options.data.type;
        let windowName = 'new' + type[0].toUpperCase() + type.slice(1);
        App.getModal(windowName).close();
        App.update();
        

      }
    })
  }
}
