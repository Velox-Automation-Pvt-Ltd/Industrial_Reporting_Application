import React from 'react';
import { MapPin, Building, Home, Plane, Calendar, Info } from 'lucide-react';
import { Images } from 'src/assets/assets';
import { Badge } from '../ui/badge';
//       id: 4,
//       title: 'Leave',
//       days: leave ?? 0,
//       icon: Plane,
//       color: 'bg-gradient-to-br from-orange-500 to-orange-600',
//       lightColor: 'bg-orange-50',
//       textColor: 'text-orange-700',
//       iconColor: 'text-orange-600',
//       description: 'on Leave',
//       percentage: 0,
const ScheduleAnalystics = () => {
  const workCategories = [
    {
      id: 1,
      title: 'Office',
      days: 8,
      icon: Building,
      stickyColor: 'bg-green-100',
      pinColor: 'bg-green-300',
      shadowColor: 'shadow-green-200',
      textColor: 'text-green-900',
      description: 'Office work days',
      percentage: 33.3,
      rotation: 'rotate-0',
    },
    {
      id: 2,
      title: 'Site',
      days: 12,
      icon: MapPin,
      stickyColor: 'bg-blue-100',
      pinColor: 'bg-blue-600',
      shadowColor: 'shadow-blue-200',
      textColor: 'text-blue-900',
      description: 'Field activities',
      percentage: 50.0,
      rotation: '-rotate-0',
    },
    {
      id: 3,
      title: 'Work From Home',
      days: 4,
      icon: Home,
      stickyColor: 'bg-purple-100',
      pinColor: 'bg-purple-600',
      shadowColor: 'shadow-purple-200',
      textColor: 'text-purple-900',
      description: 'Remote work days',
      percentage: 16.7,
      rotation: 'rotate-0',
    },
    {
      id: 4,
      title: 'Leave',
      days: 0,
      icon: Plane,
      stickyColor: 'bg-orange-100',
      pinColor: 'bg-orange-600',
      shadowColor: 'shadow-orange-200',
      textColor: 'text-orange-900',
      description: 'Days off',
      percentage: 0,
      rotation: '-rotate-0',
    },
  ];

  const todaysSchedule = {
    date: 'Wednesday, August 6, 2025',
    schedule: {
      location: 'Site Visit',
      category: 'Chargeable',
      project: 'PRJ001',
      status: 'Scheduled',
      description: 'Commissioning work at client site',
      icon: MapPin,
      iconColor: 'text-blue-500',
    },
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {workCategories.map((category) => {
          const IconComponent = category.icon;
          return (
            <div
              key={category.id}
              className={`relative group ${category.rotation} hover:rotate-0 transition-transform duration-300 hover:scale-105`}
            >
              {/* <img
                src={Images.pinImage}
                alt="Pin"
                className="absolute -top-5 -right-4 w-10 h-10 drop-shadow-lg rotate-[-20deg] z-10"
              /> */}

              <div
                className={`
                ${category.stickyColor} 
                ${category.shadowColor}
                p-6 rounded-lg shadow-xl 
                border-t-4 border-t-white/30
                relative overflow-hidden
                cursor-pointer
                hover:shadow-2xl
                transition-all duration-300
                min-h-[180px]
              `}
              >
                <div className="absolute inset-0 opacity-10">
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage: `repeating-linear-gradient(
                      0deg,
                      transparent,
                      transparent 24px,
                      rgba(0,0,0,0.1) 25px
                    )`,
                    }}
                  ></div>
                </div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-white/30 rounded-lg backdrop-blur-sm">
                      <IconComponent className={`h-6 w-6 ${category.textColor}`} />
                    </div>
                    <div className="text-right">
                      <div className={`text-3xl font-bold ${category.textColor} mb-1`}>
                        {category.days}
                      </div>
                      <div className={`text-xs ${category.textColor} opacity-70 font-medium`}>
                        days
                      </div>
                    </div>
                  </div>

                  <h3 className={`font-bold text-lg ${category.textColor} mb-2 leading-tight`}>
                    {category.title}
                  </h3>
                  <p className={`text-sm ${category.textColor} opacity-80 mb-3`}>
                    {category.description}
                  </p>

                  <div className="flex justify-between items-center">
                    <div
                      className={`
                      px-3 py-1 rounded-full text-xs font-semibold
                      bg-white/40 ${category.textColor} backdrop-blur-sm
                    `}
                    >
                      {category.percentage.toFixed(1)}%
                    </div>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < category.percentage / 20 ? 'bg-white/60' : 'bg-white/20'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="absolute top-0 right-0 w-8 h-8 bg-white/20 transform rotate-45 translate-x-4 -translate-y-4"></div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="relative group hover:rotate-0 transition-transform duration-300 rotate-1 mt-16">
        <img
          src={Images.pinImage}
          alt="Pin"
          className="absolute -top-5 -right-4 w-10 h-10 drop-shadow-lg rotate-[-20deg] z-10"
        />

        <div className="bg-orange-50 p-6 rounded-lg shadow-xl border-t-4 border-t-white/30 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 24px,
                rgba(0,0,0,0.1) 25px
              )`,
              }}
            ></div>
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white/30 rounded-lg backdrop-blur-sm">
                <Calendar className="h-5 w-5 text-yellow-900" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-yellow-900">Today's Schedule</h2>
                <p className="text-sm text-yellow-800 opacity-80">{todaysSchedule.date}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Badge className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                  {todaysSchedule.schedule.category}
                </Badge>
                <span className="font-semibold text-yellow-900">
                  {todaysSchedule.schedule.location}
                </span>
              </div>

              <div className="text-sm text-yellow-900">
                <span className="font-medium">Project:</span> {todaysSchedule.schedule.project}
              </div>

              <p className="text-sm text-yellow-800">{todaysSchedule.schedule.description}</p>

              <div className="mt-4 p-3 bg-orange-200/50 border-l-4 border-orange-600 rounded-r">
                <p className="text-sm text-orange-900">
                  <span className="font-semibold">Remember:</span> Submit tomorrow's schedule before
                  5 PM today.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleAnalystics;
