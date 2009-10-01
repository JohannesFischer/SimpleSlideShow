var SlideShow = new Class({

    options: $H({
        fadeOut: false,
        fxDuration: 500,
        fxTransition: 'quart:out',
        interval: 5000,        
        showTitle: false
    }),

    initialize: function(element, options)
    {
        this.element = $(element);

        this.options.extend(options || {});

        this.current = 0;
        this.images = this.getImages();
        this.initImages();
        if(this.options.showTitle)
        {
            this.title = new Element('p', {
                'class' : 'title'
            }).inject(this.element);
            this.setTitle();
        }
        this.slide.periodical(this.options.interval, this);
    },
    
    getImages: function()
    {
        return this.element.getElements('img');
    },
    
    initImages: function()
    {
        this.images.each(function(img, i){
            img.setStyles({
                opacity: i == 0 ? 1 : 0,
                zIndex: i == 0 ? 1 : 0
            });
        });
    },

    slide: function()
    {
        var next = this.current + 1 < this.images.length ? this.current + 1 : 0;

        this.images[next].setStyles({
            opacity: 0,
            zIndex: 2
        });
        if(this.options.fadeOut)
        {
            new Fx.Tween(this.images[this.current], {
                duration: this.options.fxDuration,
                transition: this.options.fxTransition
            }).start('opacity', 0);
        }
        new Fx.Tween(this.images[next], {
            duration: this.options.fxDuration,
            transition: this.options.fxTransition
        }).start('opacity', 1).chain(function(){
            this.images[this.current].setStyles({
                opacity: 0,
                zIndex: 0
            });
            this.images[next].setStyle('z-index', 1);
            this.current = next;
            this.setTitle();
        }.bind(this));
    },
    
    setTitle: function()
    {
        if(!this.options.showTitle)
        {
            return;
        }
        this.title.set('html', this.images[this.current].get('title'));
    }
    
});