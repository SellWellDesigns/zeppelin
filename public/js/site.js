//doc ready
$(function(){

    var
        $window   = $(window),
        $document = $(document),
        $body     = $('body'),
        $content  = $('#content')
    ;

    if($content.hasClass('stack')){

        $('li', $content).each(function(){
            var $self = $(this);

            $self.data('offsetTop', $self.offset().top);
        });

        $window.on('scroll', function(){
            var scrollTop = $window.scrollTop();

            $('li', $content).each(function(){
                var $self = $(this);

                if( $self.data('offsetTop') <= scrollTop ){
                    $self.addClass('pinned');
                } else {
                    $self.removeClass('pinned');
                }
            });
        });

    } else {
        stroll.bind($content);
    }
    
});//end doc ready