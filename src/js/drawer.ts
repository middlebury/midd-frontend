import Micromodal from 'micromodal';

Micromodal.init({
  openTrigger: 'data-drawer',
  closeTrigger: 'data-drawer-close',
  disableScroll: true
});

Micromodal.init({
  openTrigger: 'data-drawer-midd-hub',
  closeTrigger: 'data-drawer-close',
  disableScroll: false,
  onShow: () => {
    document.body.classList.add('has-toggled-elem');
  },
  onClose: () => {
    document.body.classList.remove('has-toggled-elem');
  }
});
