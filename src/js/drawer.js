import Micromodal from 'micromodal';

const toggleBodyClass = () => document.body.classList.toggle('has-drawer');

Micromodal.init({
  onShow() {
    toggleBodyClass();
  },
  onClose() {
    toggleBodyClass();
  }
});
