import { motion } from 'motion/react'
import { DetailHeader } from './sub-components'

interface TeamScreenProps {
  onNext: () => void;
  onPrev: () => void;
}

export const TeamScreen = (props: TeamScreenProps) => {
  const teamMembers = [
    {
      name: 'xpriori',
      role: 'Project Manager',
      avatar: 'XX',
      status: 'active',
      workload: 100,
      skills: [
        'Core Development',
        'Design',
        'Leadership',
        'Strategy',
        'Deploy',
      ],
    },
    // {
    //   name: "Mike Chen",
    //   role: "Lead Developer",
    //   avatar: "MC",
    //   status: "active",
    //   workload: 92,
    //   skills: ["React Native", "Node.js", "AWS"],
    // },
    // {
    //   name: "Emily Rodriguez",
    //   role: "UI/UX Designer",
    //   avatar: "ER",
    //   status: "active",
    //   workload: 78,
    //   skills: ["Figma", "User Research", "Prototyping"],
    // },
    // {
    //   name: "David Kim",
    //   role: "Backend Developer",
    //   avatar: "DK",
    //   status: "active",
    //   workload: 88,
    //   skills: ["Python", "PostgreSQL", "API Design"],
    // },
    // {
    //   name: "Lisa Wang",
    //   role: "QA Engineer",
    //   avatar: "LW",
    //   status: "available",
    //   workload: 45,
    //   skills: ["Testing", "Automation", "Quality Assurance"],
    // },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-teal-500'
      case 'available':
        return 'bg-blue-500'
      case 'busy':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getWorkloadColor = (workload: number) => {
    if (workload >= 90) return 'text-red-600 bg-red-100'
    if (workload >= 70) return 'text-yellow-600 bg-yellow-100'
    return 'text-green-600 bg-green-100'
  }

  const getAvatarColor = (index: number) => {
    const colors = [
      'bg-blue-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-green-500',
      'bg-indigo-500',
    ]
    return colors[index % colors.length]
  }

  return (
    <div className='h-full flex flex-col'>
      {/* Header */}
      <DetailHeader label='Dev Team' {...props} />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='flex-1 overflow-y-auto space-y-6'
      >
        {/* Team Overview */}
        <div className='bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg p-6 text-white'>
          <h3 className='text-lg font-semibold mb-4'>Team Overview</h3>
          <div className='grid grid-cols-3 gap-4'>
            <div className='text-center'>
              <div className='text-2xl font-bold'>{teamMembers.length}</div>
              <div className='text-indigo-100 text-sm'>Team Members</div>
            </div>
            <div className='text-center'>
              <div className='text-2xl font-bold'>
                {teamMembers.filter((m) => m.status === 'active').length}
              </div>
              <div className='text-indigo-100 text-sm'>Active</div>
            </div>
            <div className='text-center'>
              <div className='text-2xl font-bold'>
                {Math.round(
                  teamMembers.reduce((sum, m) => sum + m.workload, 0) /
                    teamMembers.length
                )}
                %
              </div>
              <div className='text-indigo-100 text-sm'>Avg Workload</div>
            </div>
          </div>
        </div>

        {/* Team Members */}
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold text-gray-800'>Team Members</h3>
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className='bg-white rounded-lg p-4'
            >
              <div className='flex items-start justify-between mb-3'>
                <div className='flex items-center space-x-3'>
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${getAvatarColor(index)}`}
                  >
                    {member.avatar}
                  </div>
                  <div>
                    <h4 className='font-semibold text-gray-800'>
                      {member.name}
                    </h4>
                    <p className='text-sm text-gray-600'>{member.role}</p>
                  </div>
                </div>
                <div className='flex items-center space-x-2'>
                  <div
                    className={`w-3 h-3 rounded-full ${getStatusColor(member.status)}`}
                  />
                  <span className='text-xs text-gray-500 capitalize'>
                    {member.status}
                  </span>
                </div>
              </div>

              <div className='mb-4'>
                <div className='flex justify-between text-sm mb-2'>
                  <span className='text-gray-600'>Workload</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getWorkloadColor(member.workload)}`}
                  >
                    {member.workload}%
                  </span>
                </div>
                <div className='w-full bg-gray-200 rounded-full h-2'>
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      member.workload >= 90
                        ? 'bg-red-500'
                        : member.workload >= 70
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                    }`}
                    style={{ width: `${member.workload}%` }}
                  />
                </div>
              </div>

              <div className='flex flex-wrap gap-2'>
                {member.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className='px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full'
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Team Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className=' bg-gradient-to-r from-slate-300 via-slate-300 to-slate-200 rounded-lg p-6'
        >
          <h3 className='text-lg font-semibold mb-4 text-gray-800'>
            Team Performance
          </h3>
          <div className='grid grid-cols-2 gap-4'>
            <div className='text-center p-4 bg-teal-50 rounded-lg'>
              <div className='text-2xl font-bold text-teal-600'>20%</div>
              <div className='text-sm text-gray-600'>Task Completion</div>
            </div>
            <div className='text-center p-4 bg-blue-50 rounded-lg'>
              <div className='text-2xl font-bold text-slate-600'>4.8</div>
              <div className='text-sm text-gray-600'>Team Rating</div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
