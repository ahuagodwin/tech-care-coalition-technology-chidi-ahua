import Swal, {SweetAlertOptions} from 'sweetalert2';
import {merge} from 'lodash-es'

// For more configurations check https://sweetalert2.github.io/#examples


interface AlertConfig extends Omit<SweetAlertOptions,"html"> {
    subject:string;
    message:string | HTMLElement;
    iconName:string;
    iconColor:'primary' | 'secondary' | 'warning' | 'danger' | 'info'
}

export const fire = (SwalOptions:SweetAlertOptions)=>{
    return Swal.fire(SwalOptions)
};

export const alert = (config?:AlertConfig, isMessage?:boolean)=>{
    // Modifiable configurations for confirmation alert
    const preConfig = {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        customClass: {
            confirmButton:'btn btn-primary',
            cancelButton:'btn btn-danger',
        },
        reverseButtons:true,
    }
    // Configurations you can't change for confirmation alert
    const postConfig = {showCancelButton:!isMessage, showCloseButton:false, buttonsStyling: false}

    const conf = merge(preConfig, config, postConfig)
    
    return fire({
        html:`<div class="d-flex flex-column">
        <div class="icon d-flex wpx-76 hpx-76 bg-${conf.iconColor}-lt-2 rounded-circle mx-auto mt-4">
          <span class="material-icons fw-700 fs-40 text-${conf.iconColor}-dk-1 my-auto mx-auto">
            ${conf.iconName}
          </span>
        </div>
        <div class="title text-secondary fw-500 fs-20 lh-24 mx-auto mt-4 px-4 text-center">${conf.subject}</div>
        <div class="message text-secondary-muted fw-400 fs-15 lh-23 mx-auto mt-2 px-4">${conf.message}</div>
      </div>`,
      ...conf
    } as SweetAlertOptions)
} 


export const toast = (type:string, title:string, message:string)=>{
    let icon, color;
    switch (type) {
        case 'success':
            icon = 'check_circle';
            color = 'success';
            break;

        case 'warning':
            icon = 'error';
            color = 'warning';
            break;

        case 'error':
            icon = 'cancel';
            color = 'danger';
            break;

        case 'info':
        default:
            icon = 'help';
            color = 'primary';
            break;
    }
    fire({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: false,
        showCancelButton: false,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        },
        html: `<div class="d-flex justify-content-between">
                  <div class="d-flex flex-grow-1 align-items-start">
                    <div class="me-2 mt-1">
                        <span class="material-icons text-${color} fs-18">
                            ${icon}
                        </span>
                    </div>
                    <div class="flex-grow-1 me-2 text-left mt-1 mb-2">
                      <p class="text-${color} mb-1 fs-16 fw-500">${title}</p>
                      <small class="m-0 text-secondary-muted fs-15 fw-normal">${message}</small>
                    </div>
                  </div>
                  <span class="swal2-cancel material-icons small cursor-pointer text-secondary-lt-1"">clear</span>
                </div>`,
                
    })

}