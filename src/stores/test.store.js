import {observable} from 'mobx'


class TestStore {
    @observable array = ['buy milk']
}

var store = window.store = new TestStore()

export default store