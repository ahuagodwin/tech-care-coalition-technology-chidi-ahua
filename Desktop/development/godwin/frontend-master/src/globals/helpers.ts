
import * as AlertService from '@/services/alert-service'

export const getBOrWFomColor = (color: string) => {
    if (!color) { return ''; }
    return (parseInt(color.replace('#', '').substring(0,6), 16) > 0xffffff / 2) ? '#000' : '#fff';
}


export const deleteData = (title: string, msg: string, cbOnConfirmed: (...arg: []) => any, cbOnCancel?: (...arg: []) => any ) => {
        AlertService.fire({
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        customClass: {
          confirmButton: 'btn hpx-40 wpx-140 rounded-0 d-flex justify-content-center align-items-center bg-blue border border-0',
          cancelButton: 'btn hpx-40 wpx-140 rounded-0 d-flex justify-content-center align-items-center bg-white border-blue text-blue border',
          popup:'wpx-350 rounded-0',
          htmlContainer:'mx-1 text-start',
        },
        showCancelButton:true,
        reverseButtons:true,
        allowOutsideClick:false,
        html:`<div class="d-flex flex-column">
            <div class='px-4 gilroy-bold text-secondary-dk-1 fs-18 lh-23 fw-700'>${title}</div>
            <div class="message fs-14 lh-18 fw-400 mx-auto mt-3 px-4 gilroy-regular" style="color:#757575;">
              ${msg}
            </div>
          </div>`
      }).then((res)=>{
        if(res.isConfirmed){
            cbOnConfirmed()
        } else {
            if (cbOnCancel) {
                cbOnCancel()
            }
        }
      })
    }