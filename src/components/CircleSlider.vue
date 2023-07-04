<script setup>
    import { ref, onMounted, defineProps, computed } from 'vue'
    const steps = ref(null)
    const stepsCount = ref(null)
    const radius = ref(0)
    const angle = ref(0)
    const currentStepValue = ref(0)
    const mousePressed = ref(false)
    const circleSliderState = ref(null)
    const mousemoveTicks = ref(0)
    const stepSize = ref(0)
    const max = ref(0)
    const min = ref(0)

    const props = defineProps({
        startAngleOffset: {
            type: Number,
            required: false,
            default: 0
        },
        value: {
            type: Number,
            required: false,
            default: 0
        },
        side: {
            type: Number,
            required: false,
            default: 100
        },
        stepSize: {
            type: Number,
            required: false,
            default: 1
        },
        min: {
            type: Number,
            required: false,
            default: 0
        },
        max: {
            type: Number,
            required: false,
            default: 100
        },
        circleColor: {
            type: String,
            required: false,
            default: '#334860'
        },
        progressColor: {
            type: String,
            required: false,
            default: '#00be7e'
        },
        knobColor: {
            type: String,
            required: false,
            default: '#00be7e'
        },
        knobRadius: {
            type: Number,
            required: false,
            default: null
        },
        knobRadiusRel: {
            type: Number,
            required: false,
            default: 7
        },
        circleWidth: {
            type: Number,
            required: false,
            default: null
        },
        circleWidthRel: {
            type: Number,
            required: false,
            default: 20
        },
        progressWidth: {
            type: Number,
            required: false,
            default: null
        },
        progressWidthRel: {
            type: Number,
            required: false,
            default: 10
        }
    })

    const cpMainCircleStrokeWidth = computed(()=>{
        return props.circleWidth || (props.side / 2) / props.circleWidthRel
    })
    const cpCenter = computed(()=>{
        return props.side / 2
    })
    const cpPathStrokeWidth = computed(()=>{
        return props.progressWidth || (props.side / 2) / props.progressWidthRel
    })
    const cpPathD = computed(()=>{
        let parts = []
        parts.push('M' + cpCenter)
        parts.push(cpCenter + radius)
        parts.push('A')
        parts.push(radius)
        parts.push(radius)
        parts.push(0)
        parts.push(cpPathDirection)
        parts.push(1)
        parts.push(cpPathX)
        parts.push(cpPathY)
        return parts.join(' ')
    })
    const cpPathDirection = computed(()=>{
        return (cpAngle < 3 / 2 * Math.PI) ? 0 : 1
    })
    const cpAngle = computed(()=>{
        return angle + Math.PI / 2
    })
    const cpPathX = computed(()=>{
        return cpCenter + radius * Math.cos(cpAngle)
    })
    const cpPathY = computed(()=>{
        return cpCenter + radius * Math.sin(cpAngle)
    })
    const cpKnobRadius = computed(()=>{
        return props.knobRadius || (props.side / 2) / props.knobRadiusRel
    })



    // const fitToStep = (val) => {
    //     return Math.round(val / this.stepSize) * this.stepSize
    // }
    //
    // /*
    //  */
    // const handleClick = (e) => {
    //     touchPosition.setNewPosition(e)
    //     if (touchPosition.isTouchWithinSliderRange) {
    //         const newAngle = touchPosition.sliderAngle
    //         this.animateSlider(angle, newAngle)
    //     }
    // }
    //
    // /*
    //  */
    // const handleMouseDown = (e) => {
    //     e.preventDefault()
    //     mousePressed = true
    //     window.addEventListener('mousemove', handleWindowMouseMove)
    //     window.addEventListener('mouseup', handleMouseUp)
    // }
    //
    // /*
    //  */
    // const handleMouseUp = (e) => {
    //     e.preventDefault()
    //     mousePressed = false
    //     window.removeEventListener('mousemove', handleWindowMouseMove)
    //     window.removeEventListener('mouseup', handleMouseUp)
    //     mousemoveTicks = 0
    // }
    //
    // /*
    //  */
    // const handleWindowMouseMove = (e) => {
    //     e.preventDefault()
    //     if (mousemoveTicks < 5) {
    //         mousemoveTicks++
    //         return
    //     }
    //
    //     touchPosition.setNewPosition(e)
    //     updateSlider()
    // }
    //
    // /*
    //  */
    // const handleTouchMove = (e) => {
    //     $emit('touchmove')
    //     // Do nothing if two or more fingers used
    //     if (e.targetTouches.length > 1 || e.changedTouches.length > 1 || e.touches.length > 1) {
    //         return true
    //     }
    //
    //     const lastTouch = e.targetTouches.item(e.targetTouches.length - 1)
    //     touchPosition.setNewPosition(lastTouch)
    //
    //     if (touchPosition.isTouchWithinSliderRange) {
    //         e.preventDefault()
    //         updateSlider()
    //     }
    // }
    //
    // /*
    //  */
    // const updateAngle = (e) => {
    //     circleSliderState.updateCurrentStepFromAngle(angle)
    //     angle.value = circleSliderState.angleValue
    //     currentStepValue.value = circleSliderState.currentStep
    //
    //     $emit('input', this.currentStepValue)
    // }
    //
    // /*
    //  */
    // const updateFromPropValue = (value) => {
    //     let stepValue = fitToStep(value)
    //     circleSliderState.updateCurrentStepFromValue(stepValue)
    //
    //     angle = circleSliderState.angleValue
    //     currentStepValue = stepValue
    //     $emit('input', currentStepValue)
    // }
    //
    // /*
    //  */
    // const updateSlider = () => {
    //     const angleC = touchPosition.sliderAngle
    //     if (Math.abs(angleC - angle) < Math.PI) {
    //         updateAngle(angleC)
    //     }
    // }
    //
    // /*
    //  */
    // const animateSlider = (startAngle, endAngle) => {
    //     const direction = startAngle < endAngle ? 1 : -1
    //     const curveAngleMovementUnit = direction * circleSliderState.angleUnit * 2
    //
    //     const animate = () => {
    //         if (Math.abs(endAngle - startAngle) < Math.abs(2 * curveAngleMovementUnit)) {
    //             updateAngle(endAngle)
    //         } else {
    //             const newAngle = startAngle + curveAngleMovementUnit
    //             updateAngle(newAngle)
    //             animateSlider(newAngle, endAngle)
    //         }
    //     }
    //
    //     window.requestAnimationFrame(animate)
    // }
    //
    // onMounted(() => {
    //     touchPosition = new TouchPosition(this.$refs._svg, this.radius, this.radius / 2)
    // })

    onMounted(() => {
        stepsCount.value = 1 + (max.value - min.value) / stepSize.value
        steps.value = Array.from({
            length: stepsCount.value
        }, (_, i) => min.value + i * stepSize.value)

        // this.circleSliderState = new CircleSliderState(this.steps, this.startAngleOffset, this.value)
        this.angle = this.circleSliderState.angleValue
        this.currentStepValue = this.circleSliderState.currentStep

        let maxCurveWidth = Math.max(this.cpMainCircleStrokeWidth, this.cpPathStrokeWidth)
        this.radius = (this.side / 2) - Math.max(maxCurveWidth, this.cpKnobRadius * 2) / 2
        this.updateFromPropValue(this.value)
    })

</script>
<template>
    123
    <div>
        <svg :width="props.side + 'px'" :height="props.side + 'px'" :viewBox="'0 0 ' + props.side + ' ' + props.side" ref="_svg">
<!--             @touchmove="handleTouchMove"-->
<!--             @click="handleClick"-->
<!--             @mousedown="handleMouseDown"-->
<!--             @mouseup="handleMouseUp"-->

            <g>
                <circle :stroke="props.circleColor" fill="none" :stroke-width="cpMainCircleStrokeWidth" :cx="cpCenter" :cy="cpCenter" :r="radius"></circle>
                <path :stroke="props.progressColor" fill="none" :stroke-width="cpPathStrokeWidth" :d="cpPathD"></path>
                <circle :fill="props.knobColor" :r="cpKnobRadius" :cx="cpPathX" :cy="cpPathY"></circle>
            </g>
        </svg>

    </div>
</template>

