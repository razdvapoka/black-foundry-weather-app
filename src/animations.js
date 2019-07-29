export const DEFAULT_ANIMATIONS = {
  D: [ {
    target: 'h1',
    origin: `'wdth' 760, 'wght' 590, 'slnt' 0`,
    originToStart: {
      duration: 750,
      easing: 'easeInOutQuad'
    },
    loop: {
      start: `'wdth' 760, 'wght' 100, 'slnt' 15`,
      end: `'wdth' 760, 'wght' 100, 'slnt' -15`,
      duration: 2000,
      easing: 'easeInOutSine'
    },
    loopToOrigin: {
      duration: 300,
      easing: 'easeInOutQuad'
    }
  } ],
  T: [ {
    target: 'h1',
    origin: `'wdth' 530, 'wght' 590, 'slnt' 0`,
    originToStart: {
      duration: 750,
      easing: 'easeInOutQuad'
    },
    loop: {
      start: `'wdth' 530, 'wght' 100, 'slnt' 15`,
      end: `'wdth' 530, 'wght' 100, 'slnt' -15`,
      duration: 2000,
      easing: 'easeInOutSine'
    },
    loopToOrigin: {
      duration: 300,
      easing: 'easeInOutQuad'
    }
  } ]
}

export const SUNNY_ANIMATIONS = {
  D: [ {
    target: 'h1',
    origin: `'wdth' 200, 'wght' 590, 'slnt' 0`,
    originToStart: {
      duration: 750,
      easing: 'easeInOutQuad'
    },
    loop: {
      start: `'wdth' 200, 'wght' 100, 'slnt' 0`,
      end: `'wdth' 200, 'wght' 590, 'slnt' 0`,
      duration: 2000,
      easing: 'easeInOutSine'
    },
    loopToOrigin: {
      duration: 300,
      easing: 'easeInOutQuad'
    }
  }, {
    target: '.sunny-up',
    origin: `'wdth' 1000, 'wght' 590, 'slnt' 0`,
    originToStart: {
      duration: 750,
      easing: 'easeInOutQuad'
    },
    loop: {
      start: `'wdth' 1000, 'wght' 100, 'slnt' 0`,
      end: `'wdth' 1000, 'wght' 590, 'slnt' 0`,
      duration: 2000,
      easing: 'easeInOutSine'
    },
    loopToOrigin: {
      duration: 300,
      easing: 'easeInOutQuad'
    }
  } ]
}

export const PARTLY_CLOUDY_ANIMATIONS = {
  D: [ {
    target: 'h1',
    origin: `'wdth' 760, 'wght' 590, 'slnt' -15`,
    originToStart: {
      duration: 300,
      easing: 'easeInOutQuad'
    },
    loop: {
      start: `'wdth' 760, 'wght' 590, 'slnt' -15`,
      end: `'wdth' 100, 'wght' 100, 'slnt' -15`,
      duration: 2000,
      easing: 'easeInOutSine'
    },
    loopToOrigin: {
      duration: 300,
      easing: 'easeInOutQuad'
    }
  } ]
}

export const RAIN_ANIMATIONS = {
  D: [ {
    target: 'h1',
    origin: `'wdth' 1000, 'wght' 100, 'slnt' 0`,
    originToStart: {
      duration: 300,
      easing: 'easeInOutQuad'
    },
    loop: {
      start: `'wdth' 1000, 'wght' 100, 'slnt' 0`,
      end: `'wdth' 1000, 'wght' 1000, 'slnt' 0`,
      duration: 2000,
      easing: 'easeInOutSine'
    },
    loopToOrigin: {
      duration: 300,
      easing: 'easeInOutQuad'
    }
  } ],
  T: [ {
    target: 'h1',
    origin: `'wdth' 530, 'wght' 100, 'slnt' 0`,
    originToStart: {
      duration: 100,
      easing: 'easeInOutSine'
    },
    loop: {
      start: `'wdth' 530, 'wght' 100, 'slnt' 0`,
      end: `'wdth' 530, 'wght' 1000, 'slnt' 0`,
      duration: 2000,
      easing: 'easeInOutSine'
    },
    loopToOrigin: {
      duration: 300,
      easing: 'easeInOutQuad'
    }
  } ]
}

export const STORM_ANIMATIONS = {
  D: [ {
    target: 'h1',
    origin: `'wdth' 100, 'wght' 590, 'slnt' 15`,
    originToStart: {
      duration: 1000,
      easing: 'easeInOutSine'
    },
    loop: {
      start: `'wdth' 100, 'wght' 590, 'slnt' -15`,
      end: `'wdth' 100, 'wght' 590, 'slnt' 15`,
      duration: 2000,
      easing: 'easeInOutSine'
    },
    loopToOrigin: {
      duration: 300,
      easing: 'easeInOutQuad'
    }
  } ]
}

export const COLD_ANIMATIONS = {
  D: [ {
    target: 'h1',
    origin: `'wdth' 530, 'wght' 100, 'slnt' 0`,
    originToStart: {
      duration: 300,
      easing: 'easeInOutQuad'
    },
    loop: {
      start: `'wdth' 530, 'wght' 100, 'slnt' 0`,
      end: `'wdth' 530, 'wght' 1000, 'slnt' 0`,
      duration: 2000,
      easing: 'easeInOutSine'
    },
    loopToOrigin: {
      duration: 300,
      easing: 'easeInOutQuad'
    }
  } ],
  T: [ {
    target: 'h1',
    origin: `'wdth' 200, 'wght' 100, 'slnt' 0`,
    originToStart: {
      duration: 100,
      easing: 'easeInOutSine'
    },
    loop: {
      start: `'wdth' 200, 'wght' 100, 'slnt' 0`,
      end: `'wdth' 200, 'wght' 1000, 'slnt' 0`,
      duration: 2000,
      easing: 'easeInOutSine'
    },
    loopToOrigin: {
      duration: 300,
      easing: 'easeInOutQuad'
    }
  } ]
}
