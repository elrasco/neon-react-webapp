import { observable, action } from "mobx";

class SettingStore {
  @observable pageSettings;
  @observable tags;
}

export default SettingStore;
