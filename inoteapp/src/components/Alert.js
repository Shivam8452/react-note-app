import React from 'react'

export default function Alert(props) {
    const capitalize = (word)=>{
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase()+ lower.slice(1);
    }
  return (    
  props.alert &&  <div className={`alert alert-${props.alert.tpe} alert-dismissible fade show`} role="alert">
  <strong>{capitalize(props.alert.tpe)}</strong>! {props.alert.msg}
</div>

  )
}