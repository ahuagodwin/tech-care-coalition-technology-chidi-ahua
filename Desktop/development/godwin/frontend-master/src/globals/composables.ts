/* import {computed} from 'vue' */
import { computed, type Ref,onMounted,onBeforeUnmount } from "vue"

const useGlobals =  ()=>{
    const apiBaseUrl = computed(() => {
        const baseUrl = process.env.VUE_APP_API_BASE_URL || "";
        return baseUrl ? baseUrl.slice(0, -1) : baseUrl;
      });
    
    const clickOutside =  async (targetElelment:Ref<any>, clickOutsideCallback:()=>any, clickOutsideCallback_condition?:()=>any) => {
        if ( ! targetElelment ) return; 
        if ( ! targetElelment.value ){
            console.log ("clickOutside", "target element was not supplied or is null")
            //return 
        }
        
        let dont_use_first_click =0;
        const listener = async (e:any)=>{ 
            let enable_click_outside = true; 
            if ( typeof clickOutsideCallback_condition == 'function'){
                enable_click_outside = await clickOutsideCallback_condition();
            }
            if ( !enable_click_outside ) return ;
    
            if ( dont_use_first_click == 0 ) {
                dont_use_first_click++;
                return;
            }
            if ( e.target == targetElelment.value || e.composedPath().includes(targetElelment.value)){
                //We clicked inside the modal/active region
                return 
            }
    
            //at this point we clicked outside the modal
            if (enable_click_outside &&  typeof clickOutsideCallback == 'function') {
                clickOutsideCallback(); 
            }
        }  
        onMounted(()=>{window.addEventListener ( 'click', listener )})
        onBeforeUnmount( ()=>{window.removeEventListener( 'click', listener )})
        return {listener}
    }
    
    
    return {
        apiBaseUrl,
        clickOutside
    }
}
export default useGlobals