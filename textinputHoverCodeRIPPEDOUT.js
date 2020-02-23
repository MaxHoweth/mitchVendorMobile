onChangeText={text => this.onEmailChangeText(text)}
onFocus={text => this.onEmailFocus(text)}
onEndEditing={(e) => this.onEmailEndEditing(e.nativeEvent.text)}
onBlur={(e) => this.onEmailEndEditing(e.nativeEvent.text)}




emailPlaceHolder:'E-mail',
passwordPlaceHolder:'Password',




            onChangeText={text => this.onPasswordChangeText(text)}
            onFocus={text => this.onPasswordFocus(text)}
            onEndEditing={(e) => this.onPasswordEndEditing(e.nativeEvent.text)}
            onBlur={(e) => this.onPasswordEndEditing(e.nativeEvent.text)}





  onEmailFocus(_text) {
      this.setState( {emailPlaceHolder:''} );

  }
  onEmailEndEditing(_text) {
    if(_text == '') { this.setState( {emailPlaceHolder:'E-mail',email:_text} ) }
    else{ this.setState( {emailPlaceHolder:'',email:_text} ) }
  }
  onEmailChangeText(_text) {
    if(_text == ''){ this.setState( {emailPlaceHolder:'E-mail',email:_text} ) }
    else { this.setState( {emailPlaceHolder:'',email:_text} ) }
  }

  onPasswordFocus(_text) {
      this.setState( {passwordPlaceHolder:''} );
  }
  onPasswordEndEditing(_text) {
    if(_text == '') { this.setState( {passwordPlaceHolder:'Password',password:_text} ) }
    else{ this.setState( {passwordPlaceHolder:'',password:_text} ) }
  }
  onPasswordChangeText(_text) {
    if(_text == ''){ this.setState( {passwordPlaceHolder:'Password',password:_text} ) }
    else { this.setState( {passwordPlaceHolder:'',password:_text} ) }
  }
