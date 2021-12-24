const aforeContent = document.getElementById('afore');
const info = document.querySelectorAll('.afore-info')
const infoExtra = document.querySelectorAll('.afore-info-extra')

aforeContent.addEventListener('click', (event) => {

  if (event.target && event.target.tagName === 'IMG') {

    let aforeName = event.target.dataset

    infoExtra.forEach(extra => {

      if (aforeName.afore !== extra.dataset.afore) {
        extra.classList.remove('active')
      }

      if (aforeName.afore === extra.dataset.afore) {
        extra.classList.toggle('active')
      }
    }
    )

    info.forEach(info => {
      if (aforeName.afore === info.dataset.afore) {
        // info.classList.toggle('active')
      }
    })
  }
})