//doc ready
$(function(){

    var
        $window   = $(window),
        $document = $(document),
        $body     = $('body'),
        $content  = $('#content')
    ;

    if($content.hasClass('stack')){

        $('[data-spy="pin"]').each(function(){
            var $self = $(this);
            $self.data('offsetTop', $self.offset().top);
        });

        $('nav.navbar')
            .attr('data-spy', 'pin')
            .data('offsetTop', $window.height())
        ;

        $window.on('scroll', function(){
            var scrollTop = $window.scrollTop();

            $('[data-spy="pin"]').each(function(){
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

    $('[data-toggle="drawer"]').on('click', function(e){
        e.preventDefault();

        var
            section = $(this).attr('href'), 
            $el     = $( section )
        ;

        $('.drawer-wrapper').addClass( section.replace('#', '') );

        $('.drawer').fadeOut('fast', function(){
            $el.fadeIn();
        });

        return false;
    });
    
});//end doc ready