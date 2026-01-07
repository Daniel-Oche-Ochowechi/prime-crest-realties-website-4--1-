interface PropertyMapProps {
  coordinates: { lat: number; lng: number }
}

export default function PropertyMap({ coordinates }: PropertyMapProps) {
  const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.${coordinates.lat}!2d${coordinates.lng}!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0!2z${coordinates.lat}N${coordinates.lng}E!5e0!3m2!1sen!2sng!4v1234567890`

  return (
    <div>
      <h2 className="text-3xl font-bold text-primary mb-6 tracking-wider">Location</h2>
      <div className="rounded-sm overflow-hidden h-96 border border-neutral-light">
        <iframe
          src={`https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}&z=15&output=embed`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  )
}
