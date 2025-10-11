'use client'
import {Disclosure, DisclosureButton, DisclosurePanel} from '@headlessui/react'

import {IFAQ} from '@/app/types/landing'
import {siteDetails} from './site-details'

import {Icon} from '@/lib/icons'
import {SmartIntro} from './smart-intro'

export const FAQ = () => {
  return (
    <section id='faq' className='py-16 lg:py-20 px-2 w-full'>
      <div className='flex flex-col gap-10'>
        <div className='px-2 md:px-4'>
          <SmartIntro />
        </div>

        <div className='w-full lg:max-w-2xl group'>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className=' first:border-t border-b group-hover:border-transparent border-zinc-300 hover:border-gray-200 last:border-b-0 md:hover:rounded-xl font-figtree'>
              <Disclosure>
                {({open}) => (
                  <div>
                    <DisclosureButton className='font-figtree flex hover:bg-white transition-all hover:rounded-xl duration-300 items-center justify-between cursor-pointer w-full px-4 py-6 md:py-8 text-lg text-left'>
                      <span className='text-xl font-semibold tracking-tighter'>
                        {faq.question}
                      </span>
                      {open ? (
                        <Icon name='add' className='w-5 h-5 text-secondary' />
                      ) : (
                        <Icon name='add' className='w-5 h-5 text-secondary' />
                      )}
                    </DisclosureButton>
                    <DisclosurePanel className='px-4 py-4 text-foreground-accent leading-8'>
                      {faq.answer}
                    </DisclosurePanel>
                  </div>
                )}
              </Disclosure>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export const faqs: IFAQ[] = [
  {
    question: `What exactly is ${siteDetails.siteName}?`,
    answer: `${siteDetails.siteName} combines integration and protection in one smart solution. It offers a modern way to exchange business cards digitally while also providing personal accident insurance coverage for added security.`,
  },
  {
    question: `What is a Digital Business Card?`,
    answer:
      'A digital business card is a modern tool for sharing contact information conveniently. It allows you to quickly and easily exchange details such as your name, company, job title, phone number, email, website, and social media links.',
  },
  {
    question:
      'What are the most common benefits of using a digital business card?',
    answer: `Digital business cards offer several benefits, including convenience, security, and accessibility. They allow you to quickly and easily exchange contact information, ensuring that your details are always up-to-date and accurate. Additionally, digital business cards provide a secure way to share sensitive information, such as your email address or phone number, without the risk of it being intercepted or stolen. Finally, digital business cards are accessible from anywhere, at any time, making it easy to stay connected with your contacts and network.`,
  },
  {
    question: 'What is the Protection Coverage Under Protap?',
    answer:
      'Protap offers personal accident insurance that provides financial protection against unexpected accidents.',
  },
]
