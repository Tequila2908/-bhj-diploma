/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
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
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    console.log(this.lastOptions)
   //this.render(this.lastOptions);
    //this.render();

  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    this.element.addEventListener('click', (e) => {
      if (e.target.classList.contains('remove-account')) {
        this.removeAccount();
        console.log('test')
      } else if (e.target.closest('.transaction__remove')){
        console.log(typeof e.target.dataset.id)
        this.removeTransaction(e.target.dataset.id);
      }
    })

  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.update()
   * для обновления приложения
   * */
  removeAccount() {
    if (this.lastOptions) {
      if (confirm('Вы действительно хотите удалить счёт?')) {
        Account.remove(this.lastOptions, User.current(), (err, response) => {
          if (response.success) {
            console.log(response);
            this.clear();
            App.update();
          }
        })
      } 
    }

  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update()
   * */
  removeTransaction( id ) {
    Transaction.remove(id, User.current(), (err, response) => {
      if (response.success) {
        console.log(response)
         App.update()
      }
    })
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render( options ) {
    if (options) {
      this.lastOptions = options;
      console.log(this.lastOptions)
      Account.get(options, User.current(), (err, response) => {
        if (response.success) {
          let renderAccount = response.data.filter(obj => obj.id == options);
          this.renderTitle(renderAccount[0].name);
        }
      });
      let optionsObj = new Object();
      optionsObj.account_id = options;
      Transaction.list(optionsObj, (err, response) => {
        if (response.success) {
          console.log(response)
          this.renderTransactions(response.data);
        }
      })
    }

  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    this.renderTransactions([]);
    this.renderTitle('Название счета');
    this.lastOptions = null;

  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle( name ) {
    this.element.querySelector('.content-description').textContent = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate( date ) {

  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML( item ) {
    let typeTransaction; 
    if (item.type === 'expense') {
      typeTransaction = 'transaction_expense';
    } else {
      typeTransaction = 'transaction_income';
    }
    let renderTransaction = `
      <div class="transaction ${typeTransaction} row">
        <div class="col-md-7 transaction__details">
          <div class="transaction__icon">
            <span class="fa fa-money fa-2x"></span>
          </div>
          <div class="transaction__info">
            <h4 class="transaction__title">${item.name}</h4>
            <div class="transaction__date">10 марта 2019 г. в 03:20</div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="transaction__summ">
            ${item.sum} <span class="currency">₽</span>
          </div>
        </div>
        <div class="col-md-2 transaction__controls">
          <button class="btn btn-danger transaction__remove" data-id="${item.id}">
            <i class="fa fa-trash"></i>  
          </button>
        </div>
      </div>`;
      return renderTransaction;
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions( data ) {
    this.element.querySelector('.content').innerHTML = '';
    console.log(data)
    for (let i = 0; i < data.length; i++) {
      this.element.querySelector('.content').insertAdjacentHTML('afterbegin', this.getTransactionHTML(data[i]));
    }
  }
}
